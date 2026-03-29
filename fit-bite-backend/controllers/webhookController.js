const crypto = require('crypto');
const Order = require('../models/Order');

exports.razorpayWebhook = async (req, res) => {
  const signature = req.headers['x-razorpay-signature'];
  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(JSON.stringify(req.body)).digest('hex');

  if (expectedSignature !== signature) return res.status(400).json({ success: false });

  if (req.body.event === 'payment.captured') {
    const paymentEntity = req.body.payload.payment.entity;
    const order = await Order.findOne({ razorpayOrderId: paymentEntity.order_id });

    if (order && order.paymentStatus === 'Pending') {
      order.paymentStatus = order.paymentMethod === 'COD' ? 'Partially Paid' : 'Fully Paid';
      await order.save();
      req.app.get('socketio').emit('new_order_received', { orderId: order._id });
    }
  }
  res.status(200).json({ status: 'ok' });
};