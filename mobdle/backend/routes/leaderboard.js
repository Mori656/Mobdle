const express = require('express');
const router = express.Router();
const Score = require('../models/Score');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/add', authMiddleware, async (req, res) => {
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

router.delete('/delete', authMiddleware, async (req, res) => {
    const {nickname} = req.body
    try {
        const deleted = await Score.findOneAndDelete({nickname});
        if (!deleted) {
            return res.status(404).json({ message: "Score not found" });
        }
        res.status(200).json("Score was removed from the database");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;