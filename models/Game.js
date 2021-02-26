const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    data: {
        type: Object,
        required: true,
        default: {}
    }
})

module.exports = mongoose.models.Gamee || mongoose.model('Game', gameSchema);