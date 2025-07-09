// models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  productDetails: [{ productName: String, price: Number, quantity: Number }],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
