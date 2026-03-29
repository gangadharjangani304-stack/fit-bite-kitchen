const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number, price: Number }],
  paymentMethod: { type: String, enum: ['ONLINE', 'COD'], required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Partially Paid', 'Fully Paid', 'Failed'], default: 'Pending' },
  totalAmount: { type: Number, required: true },
  amountPaidOnline: { type: Number, default: 0 },
  amountDueOnDelivery: { type: Number, default: 0 },
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  orderStatus: { type: String, default: 'New Order' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);