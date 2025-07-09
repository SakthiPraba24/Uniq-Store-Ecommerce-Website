const express = require('express');
const router = express.Router();
const sendOrderEmail = require('../services/emailservices'); // Assuming email service is in 'services' directory

router.post('/place-order', async (req, res) => {
    const { customerName, customerEmail, address, phone, paymentMethod, cartItems, totalPrice } = req.body;

    try {
        // Validate cart items
        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart items are invalid or empty.' });
        }

        // Create order summary for email
        await sendOrderEmail(customerEmail, { customerName, cartItems, totalPrice ,customerEmail , phone , paymentMethod });

        res.status(200).json({ message: 'Order placed successfully.' });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Failed to place order.' });
    }
});

module.exports = router;

