// Initialize Stripe with your publishable key
const stripe = Stripe('pk_live_51QEXDhHmpdjn9n3JD2ZSuIbEdHCE8RPOARhozx60L0kiSvo5bwSGqHIZUtSl3xsIKptY8oZX1NEYb0GahWzOHoIj00AE7vCYEA');

// Modal functionality
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalPrice = document.getElementById('modal-price');
const paypalButtonContainer = document.getElementById('paypal-button-container');
const stripeButtonContainer = document.getElementById('stripe-button-container');
const closeButton = document.querySelector('.close-button');

function openModal(button) {
    const product = button.closest('.product');
    const price = product.getAttribute('data-price');
    const name = product.getAttribute('data-name');
    const description = product.getAttribute('data-description');

    modalTitle.textContent = name;
    modalDescription.textContent = description;
    modalPrice.textContent = `Price: €${price}`;

    // Load PayPal and Stripe buttons
    loadPayPalButton(price);
    loadStripeButton(price);

    modal.style.display = 'block';
}

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

// Load Stripe Button with dynamic price
function loadStripeButton(price) {
    document.getElementById('card-button').onclick = async () => {
        try {
            const response = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ price: price })
            });
            const session = await response.json();
            await stripe.redirectToCheckout({ sessionId: session.id });
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to initiate card payment');
        }
    };
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
