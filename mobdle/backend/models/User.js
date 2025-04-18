const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    wonToday: {
        type: Boolean,
        required: true,
        default: false,
    },
    triedOptions: {
        type: Array,
        required: true,
        default: [],
    },
    lastTry: {
        type: Date,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;