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