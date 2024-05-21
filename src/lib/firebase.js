import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-ac26d.firebaseapp.com",
  projectId: "reactchat-ac26d",
  storageBucket: "reactchat-ac26d.appspot.com",
  messagingSenderId: "740474897917",
  appId: "1:740474897917:web:b8c3909ae953f92dc8c594"
};

const app = initializeApp(firebaseConfig);

// Pass the app instance to getAuth(), getFirestore(), and getStorage()
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
