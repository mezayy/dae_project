document.addEventListener("DOMContentLoaded", function () {
    // ✅ CAROUSEL FUNCTIONALITY
    let imageIndex = 0;
    const imagesContainer = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-images img');
    if (images.length > 0) {
        let imageName = images[imageIndex].alt;
        document.getElementById("image-name").innerText = "Current Image: " + imageName;

        function scrollCarousel(direction) {
            imageIndex += direction;
            if (imageIndex < 0) imageIndex = images.length - 1;
            if (imageIndex >= images.length) imageIndex = 0;

            imagesContainer.style.transform = `translateX(-${imageIndex * images[0].clientWidth}px)`;
            document.getElementById("image-name").innerText = "Current Image: " + images[imageIndex].alt;
        }

        window.addEventListener('resize', () => {
            imagesContainer.style.transform = `translateX(-${imageIndex * images[0].clientWidth}px)`;
        });
    }

    // ✅ DONATION FORM FUNCTIONALITY (Check if donation form exists)
    const donationForm = document.getElementById("donationForm");
    const donationMessage = document.getElementById("donationMessage");

    if (donationForm) {
        donationForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const donorName = document.getElementById("donorName").value.trim();
            const donationAmount = document.getElementById("donationAmount").value;
            const paymentMethod = document.getElementById("paymentMethod").value;

            if (donorName === "" || donationAmount < 1 || paymentMethod === "") {
                donationMessage.style.color = "red";
                donationMessage.textContent = "Please fill out all fields correctly.";
                return;
            }

            donationMessage.style.color = "green";
            donationMessage.textContent = `Thank you, ${donorName}, for your generous donation of $${donationAmount} using ${paymentMethod.replace("-", " ")}!`;
            donationForm.reset();
        });
    }

    // ✅ USER AUTHENTICATION FUNCTIONALITY
    const loginForm = document.getElementById("login-form");
    const logoutBtn = document.getElementById("logout-btn");
    const loginMessage = document.getElementById("login-message");
    const signinForm = document.getElementById("signin-form");
    const signinMessage = document.getElementById("signin-message");

    // Check if user is logged in
    if (localStorage.getItem("userEmail")) {
        if (loginForm) loginForm.style.display = "none";
        if (signinForm) signinForm.style.display = "none";
        if (logoutBtn) logoutBtn.style.display = "block";
    }

    // ✅ SIGN-UP FORM (Only add event listener if it exists)
    if (signinForm) {
        signinForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (email === "" || password === "") {
                signinMessage.textContent = "Please fill in all fields.";
                return;
            }
            if (password.length < 6) {
                signinMessage.textContent = "Password must be at least 6 characters.";
                return;
            }

            // Store user credentials
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", password);

            signinMessage.style.color = "green";
            signinMessage.textContent = "Sign up successful! Redirecting...";
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        });
    }

    // ✅ LOGIN FORM (Only add event listener if it exists)
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

    // ✅ LOGOUT BUTTON FUNCTIONALITY (Check if logout button exists)
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("userEmail");
            localStorage.removeItem("isLoggedIn");
            alert("Logged out successfully!");
            location.reload();
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const loginLink = document.getElementById("login-link");
    const signinLink = document.getElementById("signin-link");
    const logoutBtn = document.getElementById("logout-btn");

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn) {
        // Hide login & signin if logged in
        loginLink.style.display = "none";
        signinLink.style.display = "none";
        logoutBtn.style.display = "block";
    } else {
        // Hide logout if not logged in
        loginLink.style.display = "block";
        signinLink.style.display = "block";
        logoutBtn.style.display = "none";
    }

    // Logout functionality
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        alert("Logged out successfully!");
        location.reload(); // Refresh page to update UI
    });
});

