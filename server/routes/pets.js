const express = require("express");
const router = express.Router();
const { pets } = require("../models");

router.get('/byName/:username', async (req, res) => {
  const username = req.params.username;
  console.log("FINALLY ENTERED HERE!");
  try {
    const pet = await pets.findAll({ where: { username: username } });
    console.log("Pet object:", pet);

    res.json(pet);
  } catch (error) {
    console.error("Error fetching pet information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



module.exports = router;