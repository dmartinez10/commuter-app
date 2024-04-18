import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './FirebaseService'; 

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to The CommuterApp</Text>
      <Text style={styles.subtitle}>Thank you for joining us!</Text>
    </View>
  );
}

function MainScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const db = getFirestore(); 

  const handleCreateAccount = async () => {
    try {
      if (!username || !email || !password) {
        setErrorMessage('Please fill out all fields.');
        return;
      }

      // Simple email validation
      if (!/\S+@\S+\.\S+/.test(email)) {
        setErrorMessage('Please enter a valid email address.');
        return;
      }

      // Basic password strength validation
      if (password.length < 6) {
        setErrorMessage('Password should be at least 6 characters long.');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        username: username,
        email: email
      });

      Alert.alert('Account Created', 'Your account has been created successfully!');
      setUsername('');
      setEmail('');
      setPassword('');
      setErrorMessage('');
    } catch (error) {
      console.error('Failed to create account:', error.message);
      setErrorMessage('Failed to create account. Please try again.');
    }
  };

  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export { HomeScreen, MainScreen };
