// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNVp1kFB9Rewwtd2aVLY-9i6rMCkmoabw",
  authDomain: "auth-turtotial.firebaseapp.com",
  projectId: "auth-turtotial",
  storageBucket: "auth-turtotial.appspot.com",
  messagingSenderId: "241324514293",
  appId: "1:241324514293:web:9bea8ecd38aa122fd85ebc",
  measurementId: "G-NNBP3MKH3N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Configuring our application to recognize the project and initialize authentication
// and database modules... or is it SDK's?
export const db = getFirestore(app);
export const auth = getAuth(app);

// First, try and login using a gmail account
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

//Logging in users who already are registered with us
export const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Resetting a customers email for when they forget credential information
export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!!!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const logout = () => {
  signOut(auth);
};
// Add a new document with a generated id.
export const registerForAirdrop = async (address) => {
  try {
    await addDoc(collection(db, "airdrop"), {
      address
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}