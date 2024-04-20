import 'react-native-gesture-handler';
import React from 'react';
import { registerRootComponent } from 'expo';
import AppNavigator from './AppNavigator';
import { initializeApp } from '@firebase/app';

// Firebase configuration and initialization
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

// Register the main component with Expo
registerRootComponent(AppNavigator);



