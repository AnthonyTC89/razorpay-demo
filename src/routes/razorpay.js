/* eslint-disable camelcase */
const express = require('express');
const Razorpay = require('razorpay');
const Order = require('../models/Order');

const router = express.Router();

const instance = new Razorpay({
  key_id: 'rzp_test_Baj0ZJ8G2mlZZy',
  key_secret: 'mvILpY5Z5m7tCEHJgqu16EKR',
});

router.post('/api/razorpay', async (req, res) => {
  try {
    const { amount } = req.body;
    const preOrder = {
      amount,
      currency: 'INR',
      receipt: 'R #11',
      payment_capture: 1,
      notes: [],
    };
    const response = await instance.orders.create(preOrder);
    await Order.create(response); // optional
    res.status(201).send(response);
  } catch (err) {
    res.sendStatus(404);
  }
});

module.exports = router;
