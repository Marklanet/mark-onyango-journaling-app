import { AuthenticationError } from 'apollo-server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User as UserModel, JournalEntry as JournalEntryModel } from '../models';
import { UserInput, JournalEntryInput, DateRangeInput, CategoryInput, LoginInput } from '../types/types';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const resolvers = {
  Query: {
    getUser: async (_: any, { id }: { id: number }) => {
      return await UserModel.findByPk(id);
    },
    getJournalEntry: async (_: any, { id }: { id: number }) => {
      return await JournalEntryModel.findByPk(id);
    },
    getAllJournalEntries: async (_: any, { userId }: { userId: number }) => {
      return await JournalEntryModel.findAll({ where: { userId } });
    },
    getJournalEntriesByDateRange: async (_: any, { userId, startDate, endDate }: DateRangeInput) => {
      return await JournalEntryModel.findAll({
        where: {
          userId,
          date: { $gte: startDate, $lte: endDate },
        },
      });
    },
    getJournalEntriesByCategory: async (_: any, { userId, category }: CategoryInput) => {
      return await JournalEntryModel.findAll({ where: { userId, category } });
    },
  },
  Mutation: {
    signUp: async (_: any, { username, password, email }: UserInput) => {
      const existingUser = await UserModel.findOne({ where: { username } });
      if (existingUser) {
        throw new Error('Username already exists');
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const newUser = await UserModel.create({
        username,
        password: hashedPassword,
        email,
      });

      return newUser;
    },
    logIn: async (_: any, { username, password }: LoginInput) => {
      try {
        const user = await UserModel.findOne({ where: { username } });

        if (!user) {
          throw new AuthenticationError('Invalid credentials');
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
          throw new AuthenticationError('Invalid credentials');
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        return { token };
      } catch (error) {
        console.error('Login error:', error);
        throw new AuthenticationError('Invalid credentials');
      }
    },
    addJournalEntry: async (_: any, { title, content, category, date}: JournalEntryInput, context: any) => {
      

      if (!context || !context.user || !context.user.id) {
        throw new AuthenticationError('Unauthorized: Missing or invalid user context');
      }

      try {
        // Fetch the authenticated user from the database
        const user = await UserModel.findByPk(context.user.id);
        if (!user) {
          throw new Error('User not found');
        }

        // Create a new journal entry associated with the authenticated user
        const newEntry = await JournalEntryModel.create({
          title,
          content,
          category,
          date,
          userId: user.id,
        });

        return newEntry;
      } catch (error: any) { // Explicitly type 'error' as 'any' or 'unknown' as needed
        throw new Error(`Failed to add journal entry: ${(error as Error).message}`);
      }
    },
    updateJournalEntry: async (_: any, { id, title, content, category, date }: JournalEntryInput, context: any) => {
      // Check JWT token from context to authenticate
   
      if (!context.user) {
        throw new AuthenticationError('Unauthorized');
      }
      
      const journalEntry = await JournalEntryModel.findByPk(id);
      if (!journalEntry) {
        throw new Error('Entry not found');
      }
      if (journalEntry.userId !== context.user.id) {
        throw new AuthenticationError('Not authorized to update this entry');
      }
      
      const [updatedCount, updatedEntries] = await JournalEntryModel.update(
        { title, content, category, date },
        { where: { id }, returning: true }
      );
      if (updatedCount === 0) {
        throw new Error('Entry not found');
      }
      return updatedEntries[0];
    },
    
    deleteJournalEntry: async (_: any, { id }: { id: number }, context: any) => {
     
      if (!context.user) {
        throw new AuthenticationError('Unauthorized');
      }
      
      const journalEntry = await JournalEntryModel.findByPk(id);
      if (!journalEntry) {
        throw new Error('Entry not found');
      }
      if (journalEntry.userId !== context.user.id) {
        throw new AuthenticationError('Not authorized to delete this entry');
      }
      
      await journalEntry.destroy();
      return journalEntry;
    },
    
    updateUser: async (_: any, { id, username, password }: UserInput, context: any) => {
      if (!context.user) {
        throw new AuthenticationError('Unauthorized');
      }
    
      // Ensure the authenticated user is updating their own profile
      if (context.user.id !== id) {
        throw new AuthenticationError('Not authorized to update this user');
      }
    
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const [updatedCount, updatedUsers] = await UserModel.update(
        { username, password: hashedPassword },
        { where: { id }, returning: true }
      );
    
      if (updatedCount === 0) {
        throw new Error('User not found');
      }
    
      return updatedUsers[0];
    },
  }
};
