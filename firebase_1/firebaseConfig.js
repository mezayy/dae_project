// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-analytics.js";
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
const analytics = getAnalytics(app)

// import { initializeApp } from "firebase/app";
// import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
// import { getFirestore, doc, setDoc } from "firebase/firestore";

// document.addEventListener("DOMContentLoaded", () => {
//   // Firebase Configuration
//   const firebaseConfig = {
//     apiKey: "AIzaSyD5_7Zplrmev5d-CmjmOgaIN6Esg08yVio",
//     authDomain: "donation-website--daesosa.firebaseapp.com",
//     projectId: "donation-website--daesosa",
//     storageBucket: "donation-website--daesosa.firebasestorage.app",
//     messagingSenderId: "359131070362",
//     appId: "1:359131070362:web:64f5f2b769f96283ba8423",
//     measurementId: "G-00PLNKQC13"
//   };

//   const app = initializeApp(firebaseConfig);
//   const auth = getAuth(app);
//   const db = getFirestore(app);

  // UI Elements
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const loginMessage = document.getElementById("login-message");
  const logoutBtn = document.getElementById("logout-btn");
  const loginLink = document.getElementById("login-link");
  const signupLink = document.getElementById("signup-link");

  // 🔹 Login
  loginForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      loginMessage.textContent = "Please fill in all fields.";
      loginMessage.style.color = "red";
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user.email);
      loginMessage.textContent = "Login successful! Redirecting...";
      loginMessage.style.color = "green";
      setTimeout(() => {
        window.location.href = "homepage.html";
      }, 1000);
    } catch (error) {
      loginMessage.textContent = error.message;
      loginMessage.style.color = "red";
    }
  });

  // 🔹 Sign-Up
  signupForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date()
      });

      alert("Sign-up successful! You are now logged in.");
      window.location.href = "homepage.html";
    } catch (error) {
      alert("Error: " + error.message);
    }
  });

  // 🔹 Logout
  logoutBtn?.addEventListener("click", async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      window.location.href = "homepage.html";
    } catch (error) {
      alert("Logout error: " + error.message);
    }
  });

  // 🔄 Update UI on auth change
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is logged in:", user.email);
      logoutBtn?.classList.remove("d-none");
      loginLink?.classList.add("d-none");
      signupLink?.classList.add("d-none");
    } else {
      console.log("No user logged in");
      logoutBtn?.classList.add("d-none");
      loginLink?.classList.remove("d-none");
      signupLink?.classList.remove("d-none");
    }
  });
});
