import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './FirebaseService'; // Import the Firebase auth service
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to The CommuterApp</Text>
      <Text style={styles.subtitle}>Thank you for joining us!</Text>
    </View>
  );
}

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateAccount = async () => {
    try {
      if (!username || !email || !password) {
        setErrorMessage('Please fill out all fields.');
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);

      Alert.alert('Account Created', 'Your account has been created successfully!');
    } catch (error) {
      console.error('Failed to create account:', error.message);
      setErrorMessage('Failed to create account. Please try again.');
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateAccount">
          {() => (
            <View style={styles.container}>
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
                  keyboardType="email-address"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  onChangeText={setPassword}
                  value={password}
                  secureTextEntry
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleCreateAccount}
                >
                  <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>
                {errorMessage !== '' && <Text style={styles.error}>{errorMessage}</Text>}
              </View>
            </View>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default App;
