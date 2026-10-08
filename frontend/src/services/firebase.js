// src/services/firebase.js — Firebase Authentication & Config
import { initializeApp, getApps, getApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth'

export const firebaseConfig = {
  apiKey: "AIzaSyDofMh4S_yrpi0XO89BVs7pWTIYuJItqww",
  authDomain: "saradhya-jewels.firebaseapp.com",
  projectId: "saradhya-jewels",
  storageBucket: "saradhya-jewels.firebasestorage.app",
  messagingSenderId: "230381226848",
  appId: "1:230381226848:web:89e4da2aac7cf7eeebac05",
  measurementId: "G-YBJBMQ9ME0"
}

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

// Helper functions for easy import across app
export const loginWithEmail = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password)
}

export const registerWithEmail = async (email, password, displayName) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  if (displayName && userCredential.user) {
    await updateProfile(userCredential.user, { displayName })
  }
  return userCredential
}

export const loginWithGoogle = async () => {
  return await signInWithPopup(auth, googleProvider)
}

export const logoutUser = async () => {
  return await signOut(auth)
}

export const sendResetPassword = async (email) => {
  return await sendPasswordResetEmail(auth, email)
}
