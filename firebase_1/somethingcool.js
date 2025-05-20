let imageIndex = 0;
let imagesContainer;
let images;

document.addEventListener("DOMContentLoaded", function () {
    // ✅ CAROUSEL FUNCTIONALITY
    imagesContainer = document.querySelector('.carousel-images');
    images = document.querySelectorAll('.carousel-images img');

    if (images.length > 0) {
        updateCarousel(); // Initial display
        window.addEventListener('resize', updateCarousel);
    }

    // ✅ DONATION FORM FUNCTIONALITY
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
});

// ✅ Needs to be global because your buttons use onclick
function scrollCarousel(direction) {
    if (!images || images.length === 0) return;

    imageIndex += direction;

    if (imageIndex < 0) imageIndex = images.length - 1;
    if (imageIndex >= images.length) imageIndex = 0;

    updateCarousel();
}

function updateCarousel() {
    if (!imagesContainer || !images || images.length === 0) return;

    const imageWidth = images[0].clientWidth;
    imagesContainer.style.transform = `translateX(-${imageIndex * imageWidth}px)`;

    // Update the image name if available
    const imageNameElement = document.getElementById("image-name");
    if (imageNameElement) {
        imageNameElement.innerText = "Current Image: " + images[imageIndex].alt;
    }
}
