// Integer variable to track the current image index
let imageIndex = 0;

// String variable to store the current image's name
let imageName = document.querySelectorAll('.carousel-images img')[imageIndex].alt;

// Display the initial image name
document.getElementById("image-name").innerText = "Current Image: " + imageName;

// JavaScript for Carousel Functionality
const imagesContainer = document.querySelector('.carousel-images');
const images = document.querySelectorAll('.carousel-images img');
const imageWidth = images[0].clientWidth;

function scrollCarousel(direction) {
    // Update index based on direction (-1 for left, 1 for right)
    imageIndex += direction;

    // Wrap around if index exceeds limits
    if (imageIndex < 0) {
        imageIndex = images.length - 1;
    } else if (imageIndex >= images.length) {
        imageIndex = 0;
    }

    // Update the transform property for smooth scrolling
    imagesContainer.style.transform = `translateX(-${imageIndex * imageWidth}px)`;

    // Update the string variable with the new image name
    imageName = images[imageIndex].alt;

    // Display the updated image name
    document.getElementById("image-name").innerText = "Current Image: " + imageName;
}

// Adjust carousel on window resize
window.addEventListener('resize', () => {
    imagesContainer.style.transform = `translateX(-${imageIndex * images[0].clientWidth}px)`;
});

// Accessing form in the DOM
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("donationForm");
    const donationMessage = document.getElementById("donationMessage");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent actual form submission

        // Get form values
        const donorName = document.getElementById("donorName").value.trim();
        const donationAmount = document.getElementById("donationAmount").value;
        const paymentMethod = document.getElementById("paymentMethod").value;

        // Validate inputs
        if (donorName === "" || donationAmount < 1 || paymentMethod === "") {
            donationMessage.style.color = "red";
            donationMessage.textContent = "Please fill out all fields correctly.";
            return;
        }

        // Simulate donation success
        donationMessage.style.color = "green";
        donationMessage.textContent = `Thank you, ${donorName}, for your generous donation of $${donationAmount} using ${paymentMethod.replace("-", " ")}!`;

        // Optionally, clear the form after submission
        form.reset();
    });
});

//Firebase SDK 
src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js"
src="https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDxgdt1SnG09CTD_ZWZCspN_pdkBaZkK2U",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "donationsite-29fd3",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "879675986513",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


