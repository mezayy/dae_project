document.addEventListener("DOMContentLoaded", function ) 
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
  