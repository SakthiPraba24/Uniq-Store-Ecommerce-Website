const express = require('express');
const Product = require('../models/Product'); // Adjust path if needed

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching products' });
    }
});

module.exports = router;
