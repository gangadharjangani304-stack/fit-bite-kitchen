require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ==========================================
// 🛡️ MIDDLEWARE
// ==========================================
// This allows your Next.js frontend (port 3000) to talk to this backend (port 5000)
app.use(cors());
// This tells the server to understand JSON data sent from the checkout page
app.use(express.json());

// ==========================================
// 🔌 MONGODB CONNECTION
// ==========================================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err.message));

// ==========================================
// 🥗 PRODUCT SCHEMA & ROUTES
// ==========================================
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  originalPrice: Number,
  unit: String,
  category: String,
  images: [String],
  description: String,
  ingredients: String,
  benefits: String,
  weightOptions: Array
});

const Product = mongoose.model('Product', productSchema);

// GET: Fetch all products for the Menu Page
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    console.error("❌ Failed to fetch products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ==========================================
// 📦 ORDER SCHEMA & ROUTES
// ==========================================
const orderSchema = new mongoose.Schema({
  customerInfo: Object,
  items: Array,
  subtotal: Number,
  shippingFee: Number,
  totalAmount: Number,
  paymentMethod: String,
  amountToPayNow: Number,
  paymentStatus: String,
  status: String,
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// POST: Save a new order from the Checkout Page
app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    console.log("✅ New Order Received & Saved:", newOrder._id);
    res.status(201).json({ message: "Order saved securely!", order: newOrder });
  } catch (error) {
    console.error("❌ Failed to save order:", error);
    res.status(500).json({ error: "Failed to save order" });
  }
});

// GET: Fetch all orders for the Admin Dashboard
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // Sorts by newest first!
    res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Failed to fetch orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// ==========================================
// 🚀 START SERVER
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 SERVER IS ALIVE ON PORT ${PORT}`);
});