import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBUQprgD7MUjKyuNEHzb5cnUzpA7vZF-64",
  authDomain: "react-firebase-applicati-18d8a.firebaseapp.com",
  projectId: "react-firebase-applicati-18d8a",
  storageBucket: "react-firebase-applicati-18d8a.appspot.com",
  messagingSenderId: "719458275251",
  appId: "1:719458275251:web:f6f44b3e03759069b0c5c6"
};

const firebase = initializeApp(firebaseConfig);

const firebaseData = getFirestore(firebase)

export { firebaseData };