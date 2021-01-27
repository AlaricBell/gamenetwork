const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    data: {
        type: Object,
        required: true,
        default: {}
    }
})

module.exports = mongoose.models.Profile || mongoose.model('Profile', profileSchema);