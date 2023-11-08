import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBCDBh3Q8hN4g7LWmkuenZM1RWJWxEFW-A",
  authDomain: "clone-twitteer.firebaseapp.com",
  projectId: "clone-twitteer",
  storageBucket: "clone-twitteer.appspot.com",
  messagingSenderId: "980484188703",
  appId: "1:980484188703:web:c0ed64c866808b211fc32a"
};





const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

