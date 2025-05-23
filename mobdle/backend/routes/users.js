const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middlewares/authMiddleware')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

require("dotenv").config();
const SECRET = process.env.SECRET_KEY;

// Pobierz wszystkich użytkowników
router.get('/getAll', async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dodaj użytkownika
router.post('/add', async (req, res) => {
    const exist = await User.findOne({nickname: req.body.nickname})
    if (exist){
        return res.status(409).json({message: "Login already taken"});
    }

    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        nickname: req.body.nickname,
        password: hashed,
        isAdmin: req.body.isAdmin,
        wonToday: false,
        triedOptions: [],
        lastTry: new Date().toISOString().split('T')[0],
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Usuń użytkownika
router.delete('/delete/:id', async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// Logowanie
router.post('/auth', async (req, res) => {
    const { login, password } = req.body;
    const user = await User.findOne( {nickname: login} );
    if (!user) return res.status(401).json({ message: "Brak użytkownika" });

    const correct = await bcrypt.compare(password, user.password);
    if (!correct) return res.status(401).json({ message: "Złe hasło" });

    const today = new Date().toISOString().split('T')[0];
    const lastTryDate = new Date(user.lastTry).toISOString().split('T')[0];
    if (lastTryDate !== today) {
        user.triedOptions = [];
        user.wonToday = false;
        user.lastTry = today;
        await user.save();
    }

    const token = jwt.sign({ login }, SECRET, { expiresIn: "1h" });

    res.json({ token: token, isAdmin: user.isAdmin });
})

// Wylogowanie
router.delete('/logout', authMiddleware, async (req, res) => {
    res.status(200).json({ message: "wylogowano" });
})

router.put('/try', authMiddleware, async (req, res) => {
    const user = req.user;
    const triedOption = req.body.option;

    if (!Array.isArray(user.triedOptions)) {
        user.triedOptions = [];
    }
    user.triedOptions.unshift(triedOption);
    await user.save();

    res.json({ triedOptions: user.triedOptions });
});


router.get('/:login', authMiddleware, async (req, res) => {
    try {
        const login = req.params.login
        const user = await User.findOne( {nickname: login} );
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.patch('/win/:login', authMiddleware, async (req, res) => {
    try {
        const login = req.params.login
        const user = await User.findOne( {nickname: login} );
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        user.wonToday = true;
        await user.save();
        res.status(200).json({ message: "win is modiefied" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;