const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
    },
    guessNumber: {
        type: Number,
        required: true,
    }
})

const Score = mongoose.model('Score', scoreSchema);
module.exports = Score;