const mongoose = require('mongoose');

// create Schema for User
const priceSchema = new mongoose.Schema({
    gasohol95: {
        type: Number,
        required: true,
    },
    gasohol91: {
        type: Number,
        required: true,
    },
    gasoholE85: {
        type: Number,
        required: true,
    },
    gasoholE20: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
const Price = mongoose.model('Price', priceSchema);

// Export Model
module.exports = Price;