import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema/schema';
import { resolvers } from './resolvers/resolvers';
import dotenv from 'dotenv';
import sequelize from './db/db';
import { getUserFromToken } from './auth/auth'; 

dotenv.config();

const port = parseInt(process.env.PORT || '4000', 10);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }: { req: any }) => {
    // Extract token from headers
    const token = req.headers.authorization || '';
    let user = null;

    // Identify the operation type
    const operationName = req.body.operationName; 

    // Check if it's SignUp or LogIn mutation
    if (operationName === 'LogIn' || operationName === 'SignUp') {
      // Allow SignUp and LogIn mutations without token
      user = null;
    } else {
      // For other mutations and queries, require token and fetch user
      if (token) {
        user = await getUserFromToken(token);
      }
    }

    return {
      user, // This context can now be accessed in your resolvers
    };
  },
});

(async () => {
  try {
    // Synchronize all models with the database
    await sequelize.sync({ force: false }); // Set force to true to drop tables if they already exist
    console.log('Database synchronized successfully.');

    const { url } = await server.listen({ port });
    console.log(`🚀  Server ready at: ${url}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
