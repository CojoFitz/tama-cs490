const express = require("express");
const router = express.Router();
const { dialogues } = require("../models");

router.get('/:personality', async (req, res) => {
  const per = req.params.personality;
  try {
    const dialogue = await dialogues.findAll({ where: { personality_id : per }, attributes: ['question_text']  });
    const questions = dialogue.map(dialogue => dialogue.question_text);
    res.json(questions);
  } catch (error) {
    console.error("Error fetching dialogue:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;