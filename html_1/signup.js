    // ✅ SIGN-UP FORM (Only add event listener if it exists)
    document.getElementById("signup-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
    
        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }
    
        // Store user credentials
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);
    
        alert("Sign up successful! Please log in.");
        window.location.href = "login.html"; // Redirect to login page
    });
    
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