const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  const products = await Product.find({ isActive: true });
  res.status(200).json({ success: true, products });
};