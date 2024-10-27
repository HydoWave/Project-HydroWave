// Modal functionality
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalPrice = document.getElementById('modal-price');
const paypalButtonContainer = document.getElementById('paypal-button-container');
const closeButton = document.querySelector('.close-button');
const dotContainer = document.querySelector('.dot-container');
let currentImageIndex = 0;
let images = [];

// Open Modal and load product details
function openModal(button) {
    const product = button.closest('.product');
    images = product.getAttribute('data-images').split(',');

    currentImageIndex = 0;
    modalImage.src = images[currentImageIndex];
    modalTitle.textContent = product.getAttribute('data-name');
    modalDescription.textContent = product.getAttribute('data-description');
    modalPrice.textContent = `Price: €${product.getAttribute('data-price')}`;

    // Load PayPal Button with the product price
    loadPayPalButton(product.getAttribute('data-price'));

    // Initialize image gallery dots
    dotContainer.innerHTML = '';
    images.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dotContainer.appendChild(dot);
        dot.addEventListener('click', () => showImage(index));
    });

    modal.style.display = 'block';
}

// Close Modal
function closeModal() {
    modal.style.display = 'none';
}

// Load PayPal Button with dynamic price
function loadPayPalButton(price) {
    paypalButtonContainer.innerHTML = ''; // Clear any existing button

    paypal.Buttons({
        createOrder: (data, actions) => {
            return actions.order.create({
                purchase_units: [{
                    amount: { value: price }
                }]
            });
        },
        onApprove: (data, actions) => {
            return actions.order.capture().then(details => {
                alert(`Transaction completed by ${details.payer.name.given_name}!`);
                closeModal();
            });
        },
        onError: (err) => {
            console.error(err);
            alert('An error occurred during the transaction');
        }
    }).render('#paypal-button-container');
}

// Image navigation functions
function showImage(index) {
    currentImageIndex = index;
    updateImage();
}

function updateImage() {
    modalImage.src = images[currentImageIndex];
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentImageIndex);
    });
}

// Event Listeners
document.querySelectorAll('.details-button').forEach(button => {
    button.addEventListener('click', function() {
        openModal(this);
    });
});

closeButton.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

document.querySelector('.left-arrow').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateImage();
});

document.querySelector('.right-arrow').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateImage();
});
