const mongoose = require('mongoose');

const mobOfTheDaySchema = new mongoose.Schema({
    mob: {
        type: Object,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const MobOfTheDay = mongoose.model('MobOfTheDay', mobOfTheDaySchema);

module.exports = MobOfTheDay
