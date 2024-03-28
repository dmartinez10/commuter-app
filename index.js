import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App'; // Assuming your main component is in App.js

const Main = () => {
  return <App />;
};

AppRegistry.registerComponent('CommuterApp', () => Main);
