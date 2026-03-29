const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.requestOtp = async (req, res) => {
  const { mobileNumber } = req.body;
  let user = await User.findOne({ mobileNumber });
  if (!user) user = await User.create({ mobileNumber });

  const otp = '123456'; // Static for dev. Use SMS API in prod.
  user.otp = crypto.createHash('sha256').update(otp).digest('hex');
  user.otpExpires = Date.now() + 10 * 60 * 1000;
  await user.save();
  res.status(200).json({ success: true, message: 'OTP sent (123456 for testing)' });
};

exports.verifyOtp = async (req, res) => {
  const { mobileNumber, otp } = req.body;
  const user = await User.findOne({ mobileNumber });
  const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

  if (!user || user.otp !== hashedOtp || user.otpExpires < Date.now()) {
    return res.status(400).json({ success: false, message: 'Invalid OTP' });
  }
  
  user.otp = undefined; user.otpExpires = undefined; await user.save();
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });
  res.status(200).json({ success: true, token });
};