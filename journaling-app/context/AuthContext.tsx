import React, { createContext, useState, ReactNode } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useMutation, ApolloLink, HttpLink } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode library for decoding JWT tokens
import { GET_USER, SIGN_UP, LOG_IN } from '../services/queries'; // Import the necessary queries and mutations

// Define the type for the decoded token
interface DecodedToken {
  userId: string;
  exp: number;
  iat: number;
}

// Define the type for the context value
interface AuthContextType {
  user: { id: string; username: string; email: string } | null;
  login: (userData: { username: string; password: string }) => Promise<boolean>;
  logout: () => void;
  signup: (userData: { username: string; email: string; password: string }) => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the provider component
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: string; username: string; email: string } | null>(null); // Linking user state with its type definition

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(async ({ headers = {} }) => {
      const token = await AsyncStorage.getItem('token');
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    });
    return forward(operation);
  });

  const client = new ApolloClient({
    link: authLink.concat(new HttpLink({ uri: 'http://192.168.43.146:4000/' })),
    cache: new InMemoryCache(),
  });

  const [logInMutation] = useMutation(LOG_IN);
  const [signUpMutation] = useMutation(SIGN_UP);

  const login = async (userData: { username: string; password: string }): Promise<boolean> => {
    try {
      const { data } = await logInMutation({ variables: userData });
      if (data && data.logIn && data.logIn.token) {
        // Decode the token to extract user id
        const decodedToken: DecodedToken = jwtDecode(data.logIn.token);

        // Log decoded user details to console
        console.log('Decoded User:', decodedToken);

        // Fetch user details using the decoded userId
        const { data: userData } = await client.query({
          query: GET_USER,
          variables: { id: decodedToken.userId },
        });

        if (userData && userData.getUser) {
          // Set user state with fetched user details
          setUser({
            id: userData.getUser.id,
            username: userData.getUser.username,
            email: userData.getUser.email,
          });

          // Store token in AsyncStorage
          await AsyncStorage.setItem('token', data.logIn.token);

          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Login error', error);
      return false;
    }
  };

  const signup = async (userData: { username: string; email: string; password: string }) => {
    try {
      const { data } = await signUpMutation({ variables: userData });
      if (data && data.signUp) {
        // Set user state with signed-up user details
        setUser({
          id: data.signUp.id,
          username: data.signUp.username,
          email: data.signUp.email,
        });

        // Store token in AsyncStorage
        await AsyncStorage.setItem('token', data.signUp.token);
      }
    } catch (error) {
      console.error('Signup error', error);
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
