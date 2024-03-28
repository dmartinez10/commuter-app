import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { createUserAccount } from './FirebaseService'; // Import the function

export default function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if ((username.trim() === '' || password.trim() === '') && (email.trim() === '' || password.trim() === '')) {
      setErrorMessage('Please enter both username or email and password.');
      return;
    }

    if ((username === 'user' || email === 'user@example.com') && password === 'password') {
      Alert.alert('Login Successful', 'Welcome to The CommuterApp!');
    } else {
      setErrorMessage('Invalid username or password.');
    }
  };

  const handleCreateAccount = async () => {
    const userData = {
      username: username,
      email: email,
      password: password, // Consider using Firebase Authentication for password handling
      createdAt: new Date()
    };

    const success = await createUserAccount(userData);
    if (success) {
      Alert.alert('Account Created', 'Your account has been created successfully!');
    } else {
      Alert.alert('Error', 'Failed to create account.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to The CommuterApp</Text>
      <Text>Thank you for joining us!</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} />
        <Button title="Create Account" onPress={handleCreateAccount} />
        {errorMessage !== '' && <Text style={styles.error}>{errorMessage}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '80%',
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});


