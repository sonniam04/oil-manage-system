const mongoose = require('mongoose');

// create Schema for User
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const User = mongoose.model('User', userSchema);

// Export Model
module.exports = User;
