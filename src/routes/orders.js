const express = require('express');

const Order = require('../models/Order');

const router = express.Router();

router.get('/api/orders', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

module.exports = router;
