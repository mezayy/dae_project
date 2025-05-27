// Import Firebase SDK modules from the CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-analytics.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  // ✅ Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyD5_7Zplrmev5d-CmjmOgaIN6Esg08yVio",
    authDomain: "donation-website--daesosa.firebaseapp.com",
    projectId: "donation-website--daesosa",
    storageBucket: "donation-website--daesosa.firebasestorage.app",
    messagingSenderId: "359131070362",
    appId: "1:359131070362:web:64f5f2b769f96283ba8423",
    measurementId: "G-00PLNKQC13"
  };

  // ✅ Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const db = getFirestore(app);

  // ✅ UI Elements
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const loginMessage = document.getElementById("login-message");
  const logoutBtn = document.getElementById("logout-btn");
  const loginLink = document.getElementById("login-link");
  const signupLink = document.getElementById("signup-link");

  // 🔹 LOGIN
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

  // 🔹 SIGN UP
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

      // Store user info in Firestore
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

  // 🔹 LOGOUT
  logoutBtn?.addEventListener("click", async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      window.location.href = "homepage.html";
    } catch (error) {
      alert("Logout error: " + error.message);
    }
  });

  // 🔄 AUTH STATE LISTENER
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

import { getDoc, doc } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js";

// Example: Fetch current user's Firestore document
async function readUserData(userId) {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    console.log("User Data:", userSnap.data());
  } else {
    console.log("No such document!");
  }
}

import { updateDoc } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js";

// Example: Update a user's display name
async function updateUserData(userId, newData) {
  const userRef = doc(db, "users", userId);
  try {
    await updateDoc(userRef, newData);
    console.log("User data updated successfully!");
  } catch (error) {
    console.error("Error updating user data:", error);
  }
}

import { deleteDoc } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js";

// Example: Delete a user’s document
async function deleteUserData(userId) {
  try {
    await deleteDoc(doc(db, "users", userId));
    console.log("User document deleted.");
  } catch (error) {
    console.error("Error deleting document:", error);
  }
}

document.getElementById("read-btn")?.addEventListener("click", () => {
  const user = auth.currentUser;
  if (user) readUserData(user.uid);
});

document.getElementById("update-btn")?.addEventListener("click", () => {
  const user = auth.currentUser;
  if (user) updateUserData(user.uid, { displayName: "New Name" });
});

document.getElementById("delete-btn")?.addEventListener("click", () => {
  const user = auth.currentUser;
  if (user && confirm("Are you sure you want to delete your account data?")) {
    deleteUserData(user.uid);
  }
});

