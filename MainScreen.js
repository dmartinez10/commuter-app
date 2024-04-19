import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { sha256 } from 'js-sha256';
import { useNavigation } from '@react-navigation/native';

function MainScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const db = getFirestore(); 
  const navigation = useNavigation();

  const handleCreateAccount = async () => {
    if (!username || !email || !password) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (password.length < 10) {
      setErrorMessage('Password should be at least 10 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      const hashedPassword = sha256(password);
      await addDoc(collection(db, "users"), {
        username: username,
        email: email,
        password: hashedPassword
      });

      Alert.alert('Account Created', 'Your account has been created successfully!', [
        { text: "OK", onPress: () => navigation.navigate('Home') }
      ]);
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Failed to create account:', error.message);
      setErrorMessage('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
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
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            {errorMessage !== '' && <Text style={styles.error}>{errorMessage}</Text>}
          </>
        )}
      </View>
    </View>
  );
}

// Add your styles here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    elevation: 3, // for Android shadow
  },
  input: {
    height: 50,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  }
});


export default MainScreen;
