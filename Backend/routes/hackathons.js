const express = require("express");
const Hackathon = require("../models/Hackathon");
const router = express.Router();

router.get("/", async (req, res) => {
  const data = await Hackathon.find();
  res.json(data);
});

module.exports = router;
