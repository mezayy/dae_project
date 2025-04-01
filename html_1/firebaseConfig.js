import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; 

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
const auth = getAuth(app);
const db = getFirestore(app);

// 🚀 Check Authentication State (Make Sure User is Logged In)
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user.email);
        document.getElementById("logout-btn").style.display = "block";
        document.getElementById("login-link").style.display = "none";
        document.getElementById("signup-link").style.display = "none";
    } else {
        console.log("No user logged in");
        document.getElementById("logout-btn").style.display = "none";
        document.getElementById("login-link").style.display = "block";
        document.getElementById("signup-link").style.display = "block";
    }
});

// 🔹 Sign-Up Function
document.getElementById("signup-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("User signed up:", user);

        // Store user info in Firestore
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            createdAt: new Date()
        });

        alert("Sign-up successful! You are now logged in.");
        window.location.href = "homepage.html";
    } catch (error) {
        console.error("Error signing up:", error);
        alert("Error: " + error.message);
    }
});

// 🔹 Login Function
document.getElementById("login-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user.email);
        alert("Login successful!");
        window.location.href = "homepage.html";
    } catch (error) {
        console.error("Login error:", error);
        alert("Error: " + error.message);
    }
});

// 🔹 Logout Function
document.getElementById("logout-btn")?.addEventListener("click", async () => {
    try {
        await signOut(auth);
        console.log("User logged out");
        alert("Logged out successfully!");
        window.location.href = "homepage.html";
    } catch (error) {
        console.error("Logout error:", error);
        alert("Error: " + error.message);
    }
});
