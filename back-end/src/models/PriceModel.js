const mongoose = require('mongoose');

// create Schema for User
const priceSchema = new mongoose.Schema({
    wgasohol95: {
        type: Number,
        required: true,
    },
    wgasohol91: {
        type: Number,
        required: true,
    },
    wgasoholE85: {
        type: Number,
        required: true,
    },
    wgasoholE20: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
const WPrice = mongoose.model('WPrice', priceSchema);

// Export Model
module.exports = WPrice;