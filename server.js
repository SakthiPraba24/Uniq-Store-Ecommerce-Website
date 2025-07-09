/*const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

const productRoutes = require('./routes/products'); // Routes for product API
const Order = require('./models/Order'); // Order model
const sendOrderEmail = require('./services/emailservices'); // Email service

// Initialize app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(
    'mongodb+srv://sakthiprabamariappan:68ro81f8N63nvd5i@cluster0.qo5cj.mongodb.net/uniq-store?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'public', 'img')));

// Routes
app.use('/api/products', productRoutes); // Products route

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Order placement and email service route
app.post('/api/orders', async (req, res) => {
  const { email, cartItems, totalPrice } = req.body;

  try {
    // Save order details to MongoDB
    const order = new Order({
      email,
      items: cartItems,
      total: totalPrice,
    });
    await order.save();

    // Send confirmation email
    await sendOrderEmail(email, cartItems, totalPrice);

    res.status(200).json({ message: 'Order placed and email sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to place order or send email' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
*/

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const nodemailer = require('nodemailer');


const orderRoutes = require('./routes/Order');
const productRoutes = require('./routes/products');
const User=require('./models/user');
const authRoutes = require('./routes/auth');




const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://sakthiprabamariappan:9iOwgFh4HsSHyHiK@uniq.22tmo.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// Routes
app.use('/api/orders', orderRoutes);


// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'public', 'img')));

// Routes
app.use('/api/products', productRoutes); // Products route
app.use('/api/auth',authRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
