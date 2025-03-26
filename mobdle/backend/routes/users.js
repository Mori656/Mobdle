const express = require('express');
const router = express.Router();
const User = require('../models/User');

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
    const user = new User({
        nickname: req.body.nickname,
        password: req.body.password,
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
    res.status(200).json({ message: "jest git" });
})

// Wylogowanie
router.delete('/logout/:id', async (req, res) => {
    res.status(200).json({ message: "wylogowano" });
})

module.exports = router;