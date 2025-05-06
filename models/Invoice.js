const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  ticketNumber: { type: String, required: true },
  bookingReference: { type: String, required: true },
  agentId: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  uploadedFilePath: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);
