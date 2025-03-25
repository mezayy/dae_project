// Import Firebase Authentication
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Firebase Configuration
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
const auth = getAuth(app); // Initialize Firebase Authentication

// ✅ SIGN UP FUNCTION
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const signupMessage = document.getElementById("signup-message");

    if (email === "" || password === "") {
      signupMessage.textContent = "Please fill in all fields.";
      return;
    }
    if (password.length < 6) {
      signupMessage.textContent = "Password must be at least 6 characters.";
      return;
    }

    // Create User in Firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        signupMessage.style.color = "green";
        signupMessage.textContent = "Sign up successful! Redirecting...";
        setTimeout(() => {
          window.location.href = "login.html"; // Redirect to login page
        }, 1500);
      })
      .catch((error) => {
        signupMessage.style.color = "red";
        signupMessage.textContent = error.message;
      });
  });
}

// ✅ LOGIN FUNCTION
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const loginMessage = document.getElementById("login-message");

    if (email === "" || password === "") {
      loginMessage.textContent = "Please fill in all fields.";
      return;
    }

    // Sign In User
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        loginMessage.style.color = "green";
        loginMessage.textContent = "Login successful! Redirecting...";
        setTimeout(() => {
          window.location.href = "homepage.html"; // Redirect to homepage
        }, 1500);
      })
      .catch((error) => {
        loginMessage.style.color = "red";
        loginMessage.textContent = "Invalid email or password.";
      });
  });
}

// ✅ LOGOUT FUNCTION
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    signOut(auth)
      .then(() => {
        alert("Logged out successfully!");
        window.location.href = "login.html"; // Redirect to login
      })
      .catch((error) => {
        alert("Error logging out: " + error.message);
      });
  });
}
