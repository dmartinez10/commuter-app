import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import MainScreen from './MainScreen';

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
          options={{ title: 'Welcome Home' }} // Customize title for HomeScreen
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ title: 'Login or Sign Up' }} // Customize title for MainScreen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
