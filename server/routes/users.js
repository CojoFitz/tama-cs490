const express = require("express");
const router = express.Router();
const { users, sequelize } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const bcrypt = require("bcrypt");

const { sign } = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { username, email, password, petName, personality } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const userCreationResult = await sequelize.query(
      "CALL createUser(?, ?, ?, ?, ?)",
      {
        replacements: [username, email, hashedPassword, petName, personality],
        type: sequelize.QueryTypes.RAW,
      }
    );
    console.log("User created successfully:", userCreationResult);
    res.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    if (error.original && error.original.errno === 1062) {
      console.error("Duplicate entry:", error);
      res.status(400).json({ success: false, message: "Duplicate entry" });
    } else {
      console.error("Error registering user:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
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
        res.json({ token: accessToken, username: username, id: user.id });
      }
    });
  }
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/info/:username", async (req, res) => {
  const username = req.params.username;
  console.log("username: " + username);
  try {
    const info = await users.findOne({
      where: { username: username },
      attributes: { exclude: ["password"] },
    });
    console.log("returning:", info);
    res.json(info);
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ error: "Error fetching user info" });
  }
});

router.put("/updateemail/:username", async (req, res) => {
  const { username } = req.params;
  const { email } = req.body;

  try {
    await users.update({ email: email }, { where: { username: username } });
    res.json({ success: true, message: "Email updated successfully" });
  } catch (error) {
    console.error("Error updating email:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.put("/updatepassword/:username", async (req, res) => {
  const { username } = req.params;
  const { password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await users.update(
      { password: hashedPassword },
      { where: { username: username } }
    );
    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
