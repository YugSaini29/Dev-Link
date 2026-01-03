const express = require("express");
const Startup = require("../models/Startup");
const router = express.Router();

router.get("/", async (req, res) => {
  const data = await Startup.find();
  res.json(data);
});

module.exports = router;
