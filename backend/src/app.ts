import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema/schema';
import { resolvers } from './resolvers/resolvers';
import dotenv from 'dotenv';
import sequelize from './db/db';
import { getUserFromToken } from './auth/auth';
import { parse } from 'graphql';

dotenv.config();

const port = parseInt(process.env.PORT || '4000', 10);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }: { req: any }) => {
    const token = req.headers.authorization || '';
    let user = null;

    const { query } = req.body;

    let operationName = '';
    if (query) {
      const parsedQuery = parse(query);
      if (parsedQuery.definitions.length > 0) {
        const definition: any = parsedQuery.definitions[0];
        operationName = definition.name ? definition.name.value : '';
      }
    }
    
    if (operationName === 'logIn' || operationName === 'signUp') {
      user = null;
    } else {
      if (token) {
        try {
          user = await getUserFromToken(token);
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
          } else {
            console.error('Unknown error occurred during authentication');
          }
        }
      }

      if (!user) {
        throw new Error('Authentication failed: Invalid or missing token');
      }
    }

    return {
      user,
    };
  },
});

(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Database synchronized successfully.');

    const { url } = await server.listen({ port });
    console.log(`🚀  Server ready at: ${url}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Unable to connect to the database:', error.message);
    } else {
      console.error('Unknown error occurred during database synchronization');
    }
  }
})();
