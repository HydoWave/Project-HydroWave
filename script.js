// Get the modal
var modal = document.getElementById("modal");

// Get the image element inside the modal
var modalImg = document.getElementById("modal-image");

// Get the close button
var closeButton = document.querySelector(".close-button");

// Function to open the modal with the clicked image
document.querySelectorAll(".product-image").forEach(function(img) {
    img.onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        modalImg.alt = this.alt;
    }
});

// Close the modal when the close button is clicked
closeButton.onclick = function() {
    modal.style.display = "none";
}

// Close the modal when clicking outside of the modal content
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
