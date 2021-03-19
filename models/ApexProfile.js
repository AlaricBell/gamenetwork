const mongoose = require('mongoose');

const apexProfileSchema = new mongoose.Schema({
    data: {
        type: Object,
        required: true,
        default: {}
    }
})

module.exports = mongoose.models.ApexProfile || mongoose.model('ApexProfile', apexProfileSchema);