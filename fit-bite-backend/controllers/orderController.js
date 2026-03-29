// @desc    Get all orders for admin dashboard
// @route   GET /api/orders/admin
exports.getAdminOrders = async (req, res) => {
  try {
    // Fetches all orders from MongoDB and sorts by newest first
    const orders = await Order.find().sort({ createdAt: -1 });
    
    res.status(200).json({ 
      success: true, 
      count: orders.length, 
      orders 
    });
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    res.status(500).json({ success: false, message: 'Server Error fetching orders' });
  }
};