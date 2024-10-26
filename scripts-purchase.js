// Variables
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const paypalButtonContainer = document.getElementById('paypal-button-container');
let selectedItem = {};

// Toggle menu for mobile view
function toggleMenu() {
    const navList = document.querySelector('.nav-list');
    navList.classList.toggle('active');
}

// Open Modal
function openModal(button) {
    const product = button.closest('.product');
    selectedItem = {
        name: product.getAttribute('data-name'),
        price: product.getAttribute('data-price')
    };

    modalTitle.textContent = selectedItem.name;
    modalPrice.textContent = `Price: €${selectedItem.price}`;
    modal.style.display = 'block';

    loadPayPalButton(selectedItem.price);
}

// Close Modal
function closeModal() {
    modal.style.display = 'none';
}

// Load PayPal Button
function loadPayPalButton(price) {
    paypalButtonContainer.innerHTML = ''; // Clear any existing button

    paypal.Buttons({
        createOrder: (data, actions) => {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: price
                    }
                }]
            });
        },
        onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
                alert(`Transaction completed by ${details.payer.name.given_name}!`);
                closeModal();
            });
        },
        onError: (err) => {
            alert('An error occurred during the transaction');
        }
    }).render('#paypal-button-container');
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});
