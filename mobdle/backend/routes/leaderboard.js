const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

router.post('/add', async (req, res) => {
    const score = new Score({
        nickname: req.body.nickname,
        guessNumber: req.body.guessNumber,
    });

    try {
        const newScore = await score.save();
        res.status(201).json(newScore);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/getAll', async (req, res) => {
    try {
        const leaderboard = await Score.find();
        res.json(leaderboard);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;