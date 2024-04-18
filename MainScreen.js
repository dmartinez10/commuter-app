import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './FirebaseService'; 

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

      if (!/\S+@\S+\.\S+/.test(email)) {
        setErrorMessage('Please enter a valid email address.');
        return;
      }

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

export default MainScreen;
