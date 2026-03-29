const express = require('express');
const router = express.Router();

// Route 1: Create the Order for Razorpay
router.post('/', (req, res) => {
    // Razorpay requires the amount in paise (multiply by 100)
    const amount = req.body.totalAmount ? req.body.totalAmount * 100 : 20000; 
    
    // Send back a fake order ID so the frontend can open the payment window
    res.status(200).json({
        success: true,
        order: { 
            id: "order_" + Math.random().toString(36).substring(7), 
            amount: amount,
            currency: "INR"
        }
    });
});

// Route 2: Verify the Payment after the user pays
router.post('/verify-payment', (req, res) => {
    res.status(200).json({ success: true, message: "Payment Verified" });
});

module.exports = router;