//src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup as firebaseSignInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHhYdiHzXG7M9-WgrgmrFiYYb4_RCfGIM",
  authDomain: "ott-database-2b728.firebaseapp.com",
  projectId: "ott-database-2b728",
  storageBucket: "ott-database-2b728.appspot.com",
  messagingSenderId: "152804195547",
  appId: "1:152804195547:web:7d9d43647f9e512776e0fe",
  measurementId: "G-PM2B2N223J"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

// Firestore functions
export const addMovieToFirestoreWatchlist = async (userId, movie) => {
  const watchlistRef = doc(db, 'watchlists', userId);
  const watchlistSnapshot = await getDoc(watchlistRef);

  let movies = [];
  if (watchlistSnapshot.exists()) {
    movies = watchlistSnapshot.data().movies || [];
  }

  if (!movies.find(item => item.id === movie.id)) {
    movies.push(movie);
    await setDoc(watchlistRef, { movies });
  }
};

export const removeMovieFromFirestoreWatchlist = async (userId, movieId) => {
  const watchlistRef = doc(db, 'watchlists', userId);
  const watchlistSnapshot = await getDoc(watchlistRef);

  if (watchlistSnapshot.exists()) {
    const movies = watchlistSnapshot.data().movies || [];
    const updatedWatchlist = movies.filter(movie => movie.id !== movieId);
    await setDoc(watchlistRef, { movies: updatedWatchlist });
  }
};

export const getFirestoreWatchlist = async (userId) => {
  const watchlistRef = doc(db, 'watchlists', userId);
  const watchlistSnapshot = await getDoc(watchlistRef);
  if (watchlistSnapshot.exists()) {
    return watchlistSnapshot.data().movies || [];
  }
  return [];
};

// Function to add payment details to Firestore
export const addPaymentToFirestore = async (userId, email, name, plan, price) => {
  const paymentData = {
    userId,
    email,
    name,
    plan,
    price,
    timestamp: new Date(),
  };
  await addDoc(collection(db, 'payments'), paymentData);
};

// Exports
export { auth, provider, db, storage, firebaseSignInWithPopup };
