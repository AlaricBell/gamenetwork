const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    displayName: {
        type: String,
        required: true,
        unique: true,
    },
    tags: {
      type: Array
    },
    platforms: [{
      platformDisplay: String,
      platformValue: String
    }],
    createdAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.models.Game || mongoose.model('Game', gameSchema);