const express = require('express');
const router = express.Router();
const Mob = require('../models/Mob');

// Pobierz wszystkie moby
router.get('/getAll', async (req, res) => {
  try {
    const mobs = await Mob.find();
    res.json(mobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Dodaj nowego moba
router.post('/add', async (req, res) => {
  const mob = new Mob({
    name: req.body.name,
    image: req.body.image,
    version: req.body.version,
    health: req.body.health,
    height: req.body.height,
    behavior: req.body.behavior,
    movement: req.body.movement,
    dimension: req.body.dimension,
  });

  try {
    const newMob = await mob.save();
    res.status(201).json(newMob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/daily', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

        let dailyMob = await MobOfTheDay.findOne();

        if (!dailyMob || dailyMob.date.toISOString().split('T')[0] !== today) {
          const allMobs = await Mob.find();
          const randomIndex = Math.floor(Math.random() * allMobs.length);
          const selectedMob = allMobs[randomIndex];

          dailyMob = await MobOfTheDay.findOneAndUpdate(
              {},
              { mob: selectedMob, date: new Date() },
              { upsert: true, new: true }
          );
        }

        res.json(dailyMob.mob);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;