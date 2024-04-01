const express = require("express");
const router = express.Router();
const { users, sequelize } = require("../models");
const bcrypt = require("bcrypt");

const { sign } = require("jsonwebtoken");


router.post("/register", async (req, res) => {
  
  const { username, email, password, petName, personality } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const userCreationResult = await sequelize.query("CALL createUser(?, ?, ?, ?, ?)", {
      replacements: [username, email, hashedPassword, petName, personality],
      type: sequelize.QueryTypes.RAW,
    });
    console.log("User created successfully:", userCreationResult);
    res.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await users.findOne({ where: { username: username } });

  if (!user) {
    res.json({ error: "User Doesn't Exist" });
  } else {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.json({ error: "Wrong Username And Password Combination" });
      } else {
        const accessToken = sign(
          { username: user.username, id: user.id },
          "importantsecret"
        );
        res.json(accessToken);
      }
    });
  }
});

module.exports = router;