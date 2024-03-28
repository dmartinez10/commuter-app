import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { initializeApp } from '@firebase/app';

// Initialize Firebase
const firebaseConfig = {
  // your firebase config
};
initializeApp(firebaseConfig);

const Root = () => <App />;

AppRegistry.registerComponent(appName, () => Root);
