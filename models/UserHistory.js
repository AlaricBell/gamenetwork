const mongoose = require('mongoose');

const userHistorySchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.models.UserHistory || mongoose.model('UserHistory', userHistorySchema);