import React, { useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../context/AuthContext';
import { GET_ALL_JOURNAL_ENTRIES } from '../services/queries';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Define the types for your navigation and route params
type RootStackParamList = {
  Home: undefined;
  AddEntry: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const authContext = useContext(AuthContext);

  // Check if context is undefined
  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { user, logout } = authContext;

  // Log user details to console
  useEffect(() => {
    console.log('User from context:', user);
  }, [user]);

  // Fetch journal entries for the logged-in user
  const { loading, error, data } = useQuery(GET_ALL_JOURNAL_ENTRIES, {
    variables: { userId: user?.id },
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Welcome, {user?.username}</Text>
      <Button title="Logout" onPress={logout} />
      <Button title="Add Entry" onPress={() => navigation.navigate('AddEntry')} />
      {data && (
        <FlatList
          data={data.getAllJournalEntries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.entry}>
              <Text>{item.title}</Text>
              <Text>{item.content}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  entry: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HomeScreen;
