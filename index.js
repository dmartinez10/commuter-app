<<<<<<< Updated upstream
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { initializeApp } from '@firebase/app';

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

// Register the main component
AppRegistry.registerComponent(appName, () => Root);
<<<<<<< HEAD

=======
=======
import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
>>>>>>> Stashed changes
>>>>>>> 8ef7ca05 (Resolve merge conflicts in index.js)
