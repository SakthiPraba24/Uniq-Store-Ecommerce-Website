const express = require('express');
const { sendOrderConfirmation } = require('../services/emailservices');
const router = express.Router();

// Example order submission route
router.post('/submit-order', async (req, res) => {
    const orderDetails = req.body;  // Assuming order details are sent in the request body
    const customerEmail = req.body.email;

    try {
        await sendOrderConfirmation(customerEmail, orderDetails);
        res.status(200).send('Order placed successfully. Confirmation email sent!');
    } catch (error) {
        res.status(500).send('There was an issue placing your order.');
    }
});

module.exports = router;
