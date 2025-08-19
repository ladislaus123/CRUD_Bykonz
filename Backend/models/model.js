const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    tel: { type: Number, required: true },
    address: { type: String },
    company: { type: String },
    shipIMO: { type: Number },
    shipName: { type: String },
    shipPhoto: { type: Buffer } // Store image as binary data
});

module.exports = mongoose.model('Customer', CustomerSchema);