const mongoose = require('mongoose');

const overwatchProfileSchema = new mongoose.Schema({
    data: {
        type: Object,
        required: true,
        default: {}
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.models.OverwatchProfile || mongoose.model('OverwatchProfile', overwatchProfileSchema);