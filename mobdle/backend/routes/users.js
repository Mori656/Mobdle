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

// Pobierz jednego użytkownika
// router.get('/get/:id', async(req, res) => {
//     try {
//         const userId = req.params.id
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: "user not found" });
//         }
//         res.json(user);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

router.get('/get/:login', async(req, res) => {
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
});


// Dodaj użytkownika
router.post('/add', async (req, res) => {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        nickname: req.body.nickname,
        password: hashed,
        isAdmin: req.body.isAdmin,
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

    const token = jwt.sign({ login }, SECRET, { expiresIn: "1h" });

    res.json({ token });
})

// Wylogowanie
router.delete('/logout', authMiddleware, async (req, res) => {
    res.status(200).json({ message: "wylogowano" });
})

module.exports = router;