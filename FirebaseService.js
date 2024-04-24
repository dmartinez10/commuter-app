// FirebaseService.js
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

//Firebase configuration
const firebaseConfig = {
  // config values
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Function to create a user account record
export const createUserAccount = async (userData) => {
  try {
    const userRef = doc(db, 'users', userData.email); // Using email as the document ID
    await setDoc(userRef, userData);
    console.log('User account created successfully!');
    return true;
  } catch (error) {
    console.error('Error creating user account:', error);
    return false;
  }
};
