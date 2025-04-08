// Firebase Auth & Firestore
const auth = firebase.auth();
const db = firebase.firestore();

// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const loginMessage = document.getElementById("login-message");
    const logoutBtn = document.getElementById("logout-btn");
    const loginLink = document.getElementById("login-link");
    const signupLink = document.getElementById("signup-link");

    // 🔐 LOGIN
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!email || !password) {
                loginMessage.textContent = "Please fill in all fields.";
                loginMessage.style.color = "red";
                return;
            }

            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    loginMessage.textContent = "Login successful! Redirecting...";
                    loginMessage.style.color = "green";
                    setTimeout(() => {
                        window.location.href = "index.html";
                    }, 1000);
                })
                .catch(error => {
                    loginMessage.textContent = error.message;
                    loginMessage.style.color = "red";
                });
        });
    }

    // ✅ Update UI on auth change
    auth.onAuthStateChanged(user => {
        if (user) {
            // Hide login/signup links, show logout
            if (loginLink) loginLink.classList.add("d-none");
            if (signupLink) signupLink.classList.add("d-none");
            if (logoutBtn) logoutBtn.classList.remove("d-none");
        } else {
            // Show login/signup, hide logout
            if (loginLink) loginLink.classList.remove("d-none");
            if (signupLink) signupLink.classList.remove("d-none");
            if (logoutBtn) logoutBtn.classList.add("d-none");
        }
    });

    // 🚪 LOGOUT
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            auth.signOut().then(() => {
                alert("Logged out successfully!");
                window.location.href = "index.html";
            });
        });
    }
});
