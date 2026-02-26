const mongoose = require('mongoose');

// create Schema for User
const financeSchema = new mongoose.Schema({
    typeFuel: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    fuelAmount: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    transactionDate: {   // เพิ่มฟิลด์วันที่
        type: Date,
        required: true,
        default: Date.now,  // ตั้งค่าหมายเลขเริ่มต้นให้เป็นวันที่ปัจจุบัน
    },
}, { timestamps: true });

const Finance = mongoose.model('Finance', financeSchema);

// Export Model
module.exports = Finance;
