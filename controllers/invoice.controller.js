const Invoice = require('../models/Invoice');

exports.createInvoice = async (req, res) => {
  const { ticketNumber, bookingReference, agentId, amount, date } = req.body;
  const uploadedFilePath = req.file ? req.file.path : null;
  try {
    const invoice = new Invoice({
      ticketNumber,
      bookingReference,
      agentId,
      amount,
      date,
      uploadedFilePath,
      createdBy: req.user.id,
    });
    await invoice.save();
    res.status(201).json(invoice);
  } catch (err) {
    res.status(500).json({ message: 'Could not create invoice', error: err.message });
  }
};

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve invoices', error: err.message });
  }
};

exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.status(200).json(invoice);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching invoice', error: err.message });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const updated = await Invoice.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Invoice not found or unauthorized' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Could not update invoice', error: err.message });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const deleted = await Invoice.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'Invoice not found or unauthorized' });
    res.status(200).json({ message: 'Invoice deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Could not delete invoice', error: err.message });
  }
};
