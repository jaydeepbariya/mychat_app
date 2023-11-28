const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email: {
        type: String
    },
    otp: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    expiresAt: {
        type: Date,
        default: Date.now() + 5*60*1000
    }
});

module.exports = mongoose.model("Otp", otpSchema);