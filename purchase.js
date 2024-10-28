const express = require("express");
const paypal = require("paypal-rest-sdk");
const dotenv = require("dotenv");
dotenv.config();

paypal.configure({
  mode: "sandbox",
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET
});

const app = express();
app.use(express.json());

app.post("/create-order", (req, res) => {
  const { amount, description } = req.body;

  const create_payment_json = {
    intent: "sale",
    payer: { payment_method: "paypal" },
    transactions: [{
      amount: { currency: "EUR", total: amount },
      description: description
    }],
    redirect_urls: {
      return_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel"
    }
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) return res.status(500).send(error);
    res.json({ id: payment.id });
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
