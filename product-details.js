document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const price = urlParams.get('price');
    const description = urlParams.get('description');
    const imageSrc = urlParams.get('imageSrc');

    document.getElementById('product-title').textContent = name;
    document.getElementById('product-price').textContent = `Price: €${price}`;
    document.getElementById('product-description').textContent = description;
    document.getElementById('product-image').src = imageSrc;

    document.getElementById('buy-button').addEventListener('click', () => {
        const quantity = document.getElementById('quantity').value;
        const totalPrice = (price * quantity).toFixed(2);
        alert(`Thank you for purchasing ${quantity} ${name}(s)! Total price: €${totalPrice}`);
    });
});
