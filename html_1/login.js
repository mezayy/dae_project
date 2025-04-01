  // ✅ USER AUTHENTICATION FUNCTIONALITY
  const loginForm = document.getElementById("login-form");
  const logoutBtn = document.getElementById("logout-btn");
  const loginMessage = document.getElementById("login-message");
  const signinForm = document.getElementById("signin-form");
  const signinMessage = document.getElementById("signin-message");

  // Check if user is logged in
  if (localStorage.getItem("userEmail")) 
      if (loginForm) loginForm.style.display = "none";
      if (signinForm) signinForm.style.display = "none";
      if (logoutBtn) logoutBtn.style.display = "block";
  

// ✅ LOGIN FORM (Only add event listener if it exists)
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (email === storedEmail && password === storedPassword) {
        localStorage.setItem("isLoggedIn", "true"); // Mark user as logged in
        alert("Logged in successfully!");
        window.location.href = "homepage.html"; // Redirect to homepage
    } else {
        alert("Invalid email or password.");
    }
});

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (email === "" || password === "") {
            loginMessage.textContent = "Please fill in all fields.";
            return;
        }

        const storedEmail = localStorage.getItem("userEmail");
        const storedPassword = localStorage.getItem("userPassword");

        if (email !== storedEmail || password !== storedPassword) {
            loginMessage.textContent = "Invalid email or password.";
            return;
        }

        localStorage.setItem("isLoggedIn", "true");
        alert("Logged in successfully!");
        location.reload();
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const loginLink = document.getElementById("login-link");
    const signupLink = document.getElementById("signup-link");
    const logoutBtn = document.getElementById("logout-btn");

    // Check login status
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn) {
        // Hide login & signup if logged in
        if (loginLink) loginLink.style.display = "none";
        if (signupLink) signupLink.style.display = "none";
        if (logoutBtn) logoutBtn.style.display = "block";
    } else {
        // Show login/signup when not logged in
        if (loginLink) loginLink.style.display = "block";
        if (signupLink) signupLink.style.display = "block";
        if (logoutBtn) logoutBtn.style.display = "none";
    }

    // ✅ Ensure the homepage is always accessible
    if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
        return; // Allow access to homepage always
    }

    // ❌ Redirect logged-in users away from login page
    if (isLoggedIn && window.location.pathname.includes("login.html")) {
        window.location.href = "index.html"; // Redirect to homepage
    }

    // 🔒 Redirect non-logged-in users from protected pages (except homepage)
    if (!isLoggedIn && !window.location.pathname.includes("index.html") && !window.location.pathname.includes("signup.html") && !window.location.pathname.includes("login.html")) {
        alert("Please log in to access this page.");
        window.location.href = "login.html"; // Redirect to login
    }

    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userEmail");
            alert("Logged out successfully!");
            window.location.href = "index.html"; // Redirect to homepage after logout
        });
    }
});


// ✅ LOGOUT BUTTON FUNCTIONALITY (Check if logout button exists)
if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("isLoggedIn");
        alert("Logged out successfully!");
        location.reload();
    });
}
;

document.addEventListener("DOMContentLoaded", function () {
const loginLink = document.getElementById("login-link");
const signupLink = document.getElementById("signup-link");
const logoutBtn = document.getElementById("logout-btn");

// Check login status
const isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn) {
    // Hide login & signup if logged in
    if (loginLink) loginLink.style.display = "none";
    if (signupLink) signupLink.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "block"; // Show logout when logged in
} else {
    // Show login/signup when not logged in
    if (loginLink) loginLink.style.display = "block";
    if (signupLink) signupLink.style.display = "block";
    if (logoutBtn) logoutBtn.style.display = "none"; // Hide logout when not logged in
}

// ✅ Ensure the homepage logout button is only shown when logged in
if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
    if (!isLoggedIn && logoutBtn) {
        logoutBtn.style.display = "none"; // Hide logout on homepage if not logged in
    }
}

// Logout functionality
if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        alert("Logged out successfully!");
        window.location.href = "index.html"; // Redirect to homepage after logout
    });
}
});