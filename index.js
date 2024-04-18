import React from 'react';
import { AppRegistry } from 'react-native';
import { registerRootComponent } from 'expo';
import App from './App';
import { name as appName } from './app.json';
import { initializeApp } from '@firebase/app';
import './FirebaseService'; // Import Firebase initialization

// Define your Firebase configuration
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Root component
const Root = () => <App />;

// Register the main component with React Native
AppRegistry.registerComponent(appName, () => Root);

// Register the main component with Expo
registerRootComponent(Root);

