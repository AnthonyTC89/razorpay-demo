const mongoose = require('mongoose');

const { Schema } = mongoose;
const OrderSchema = new Schema({
  entity: { type: String, required: true, default: 'order' },
  amount: { type: Number, required: true },
  amount_paid: { type: Number, required: true },
  amount_due: { type: Number, required: true },
  currency: { type: String, required: true, default: 'INR' },
  receipt: { type: String },
  status: { type: String, required: true, default: 'created' },
  attempts: { type: Number, required: true, default: 0 },
  notes: { type: Array, default: [] },
},
{ collection: 'orders', timestamps: { createdAt: 'created_at', currentTime: () => Math.floor(Date.now() / 1000) } });

module.exports = mongoose.model('Order', OrderSchema);
