// Modal functionality
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalPrice = document.getElementById('modal-price');
const closeButton = document.querySelector('.close-button');
const dotContainer = document.querySelector('.dot-container');

let currentImageIndex = 0;
let images = [];

// Event listeners for modal open
document.querySelectorAll('.details-button').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.parentElement;
        images = product.getAttribute('data-images').split(',');

        currentImageIndex = 0;
        modalImage.src = images[currentImageIndex];
        modalTitle.textContent = product.getAttribute('data-name');
        modalDescription.textContent = product.getAttribute('data-description');
        modalPrice.textContent = `Price: €${product.getAttribute('data-price')}`;

        dotContainer.innerHTML = '';
        images.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dotContainer.appendChild(dot);
            dot.addEventListener('click', () => showImage(index));
        });

        modal.style.display = 'block';
    });
});

// Close modal
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', event => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Image navigation
document.querySelector('.left-arrow').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateImage();
});

document.querySelector('.right-arrow').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateImage();
});

function showImage(index) {
    currentImageIndex = index;
    updateImage();
}

function updateImage() {
    modalImage.src = images[currentImageIndex];
    document.querySelectorAll('.dot').forEach((dot, index) => {
        if (index === currentImageIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function purchaseItem() {
    alert("Thank you for your purchase! This item will be available soon.");
}
