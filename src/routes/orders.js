/* eslint-disable camelcase */
const express = require('express');
// const jwt = require('jsonwebtoken');

const Order = require('../models/Order');

const router = express.Router();

router.get('/api/orders', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

router.post('/api/orders', async (req, res) => {
  try {
    // const { orderCoded } = req.body;
    // const decoded = jwt.verify(orderCoded, process.env.REACT_APP_JWT_SECRET);
    // const { amount } = decoded;
    const { amount } = req.body;
    const post = new Order({ amount, amount_paid: 0, amount_due: amount });
    await post.save();
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(404);
  }
});

module.exports = router;
