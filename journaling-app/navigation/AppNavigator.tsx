// AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AddEntryScreen from '../screens/AddEntryScreen';
import EditEntryScreen from '../screens/EditEntryScreen';
import ViewEntryScreen from '../screens/ViewEntryScreen';


type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  AddEntry: undefined;
  EditEntry: { id: string };
  ViewEntry: { id: string };
  Summary: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddEntry" component={AddEntryScreen} />
  
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
