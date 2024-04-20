import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { initializeApp } from '@firebase/app';
import 'react-native-gesture-handler';
import HomeScreen from './HomeScreen';
import MainScreen from './MainScreen';

// Firebase configuration
const firebaseConfig = {
  apiKey: "your-newly-generated-api-key",
  authDomain: "commuterapp-ebf55.firebaseapp.com",
  projectId: "commuterapp-ebf55",
  storageBucket: "commuterapp-ebf55.appspot.com",
  messagingSenderId: "260305041607",
  appId: "your-app-id",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"  // Set the initial screen
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e', // Customize the header with a custom color
          },
          headerTintColor: '#fff', // Customizes the color of header text
          headerTitleStyle: {
            fontWeight: 'bold', // Make header titles bold
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome to The CommuterApp' }} // Customize title for HomeScreen
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ title: 'Login or Sign Up to The CommuterApp' }} // Customize title for MainScreen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
