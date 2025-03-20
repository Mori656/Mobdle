const express = require('express');
const router = express.Router();
const Mob = require('../models/Mob');

// Pobierz wszystkie moby
router.get('/', async (req, res) => {
  try {
    const mobs = await Mob.find();
    res.json(mobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Dodaj nowego moba
router.post('/', async (req, res) => {
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

module.exports = router;