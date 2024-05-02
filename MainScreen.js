import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { sha256 } from 'js-sha256';
import { useNavigation } from '@react-navigation/native';

function MainScreen() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const db = getFirestore(); 
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    setIsLoading(true);
    const usersRef = collection(db, "user");
    const q = query(usersRef, where("Email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      setErrorMessage('No such user found.');
      setIsLoading(false);
    } else {
      const userData = querySnapshot.docs[0].data();
      if (userData.Password === sha256(password)) { // Compare hashed password
        navigation.navigate('Home');
      } else {
        setErrorMessage('Incorrect password.');
      }
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
              placeholder="User Name (optional)"
              onChangeText={setUserName}
              value={userName}
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
              onPress={handleLogin}  // Changed to handleLogin
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            {errorMessage !== '' && <Text style={styles.error}>{errorMessage}</Text>}
          </>
        )}
      </View>
    </View>
  );
}

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
    elevation: 3,
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
