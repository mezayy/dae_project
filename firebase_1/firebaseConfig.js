// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5_7Zplrmev5d-CmjmOgaIN6Esg08yVio",
  authDomain: "donation-website--daesosa.firebaseapp.com",
  projectId: "donation-website--daesosa",
  storageBucket: "donation-website--daesosa.firebasestorage.app",
  messagingSenderId: "359131070362",
  appId: "1:359131070362:web:64f5f2b769f96283ba8423",
  measurementId: "G-00PLNKQC13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { auth } from './firebaseConfig.js';
  import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
  } from 'https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js';

  const form = document.getElementById('auth-form');
  const toggleLink = document.getElementById('toggle-auth');
  const formTitle = document.getElementById('form-title');
  const authButton = document.getElementById('auth-button');
  const authMessage = document.getElementById('auth-message');
  const logoutBtn = document.getElementById('logout-btn');

  let isLogin = true;

 // Toggle between Login and Sign Up
 toggleLink.addEventListener('click', () => {
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? 'Log In' : 'Sign Up';
  authButton.textContent = isLogin ? 'Log In' : 'Sign Up';
  toggleLink.textContent = isLogin
    ? "Don't have an account? Sign Up"
    : "Already have an account? Log In";
  authMessage.textContent = '';
});


  // 🔁 Form Submit Handler
  form.addEventListener('submit', async (e) => {
    // ... your form logic
  });

  // 🔒 Logout handler
  logoutBtn.addEventListener('click', async () => {
    // ... your logout logic
  });

  // 👀 Auth state observer
  onAuthStateChanged(auth, (user) => {
    // ... user check logic
  });