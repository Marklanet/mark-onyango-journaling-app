// src/screens/EditEntryScreen.tsx
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useMutation, useQuery } from '@apollo/client';
import { GET_JOURNAL_ENTRY, UPDATE_JOURNAL_ENTRY } from '../services/queries';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  EditEntry: { entryId: string };
};

type EditEntryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditEntry'>;
type EditEntryScreenRouteProp = RouteProp<RootStackParamList, 'EditEntry'>;

type EditEntryScreenProps = {
  navigation: EditEntryScreenNavigationProp;
  route: EditEntryScreenRouteProp;
};

const EditEntryScreen: React.FC<EditEntryScreenProps> = ({ navigation, route }) => {
  const authContext = useContext(AuthContext);
  const { entryId } = route.params;

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { user } = authContext;
  const { data, loading, error } = useQuery(GET_JOURNAL_ENTRY, {
    variables: { id: entryId },
  });

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const [updateJournalEntry] = useMutation(UPDATE_JOURNAL_ENTRY);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const handleUpdateEntry = async () => {
    try {
      await updateJournalEntry({
        variables: {
          id: entryId,
          title,
          content,
          category,
          date,
        },
      });
      Alert.alert('Entry Updated', 'Your journal entry has been updated successfully');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Update Entry Failed', 'An error occurred while updating the entry');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Journal Entry</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#666"
        value={title || data?.journalEntry.title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        placeholderTextColor="#666"
        value={content || data?.journalEntry.content}
        onChangeText={setContent}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        placeholderTextColor="#666"
        value={category || data?.journalEntry.category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        placeholderTextColor="#666"
        value={date || data?.journalEntry.date}
        onChangeText={setDate}
      />
      <Button title="Update Entry" onPress={handleUpdateEntry} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
  },
});

export default EditEntryScreen;
