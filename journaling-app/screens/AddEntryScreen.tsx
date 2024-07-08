// AddEntryScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AddEntryScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Add Entry Screen</Text>
      {/* Your screen content */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default AddEntryScreen;
