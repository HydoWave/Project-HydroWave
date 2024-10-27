const express = require('express');
const app = express();
const stripe = require('stripe')('pk_live_51QEXDhHmpdjn9n3JD2ZSuIbEdHCE8RPOARhozx60L0kiSvo5bwSGqHIZUtSl3xsIKptY8oZX1NEYb0GahWzOHoIj00AE7vCYEA');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/create-checkout-session', async (req, res) => {
    const { price } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'eur',
                    product_data: { name: 'Product Purchase' },
                    unit_amount: Math.round(price * 100), // Convert to cents
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'https://your-website.com/success',  // Replace with your success URL
            cancel_url: 'https://your-website.com/cancel',    // Replace with your cancel URL
        });
        res.json({ id: session.id });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
