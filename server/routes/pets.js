const express = require("express");
const router = express.Router();
const { pets } = require("../models");

router.get('/byName/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const pet = await pets.findAll({ where: { username: username } });
    console.log("Pet object:", pet);

    res.json(pet);
  } catch (error) {
    console.error("Error fetching pet information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put('/updateStats/:petId', async (req, res) => {
  const petId = req.params.petId;
  const { stat, value } = req.body;
  try {
    const pet = await pets.findByPk(petId);
    pet[stat] = value;
    await pet.save();

    res.json({ message: "Pet stats updated successfully" });
  } catch (error) {
    console.error("Error updating pet stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put('/updateLogin/:petId', async (req, res) => {
  const petId = req.params.petId;

  try {
    const pet = await pets.findByPk(petId);
    pet.hunger = req.body.hunger;
    pet.sleepiness = req.body.sleepiness;
    pet.fun = req.body.fun;
    pet.affection = req.body.affection;

    await pet.save();
    res.json({ message: "Pet stats updated successfully" });
  } catch (error) {
    console.error("Error updating pet stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;