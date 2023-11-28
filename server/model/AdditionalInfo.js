const mongoose = require("mongoose");

const additionalInformationSchema = new mongoose.Schema({
    bio: {
        type: String
    },
    location: {
        type: String
    },
    mobileNumber: {
        type: String
    },
    gender: {
        type: String
    }
});

module.exports = mongoose.model("AdditionalInformation", additionalInformationSchema);