const mongoose = require("mongoose");

const HackathonSchema = new mongoose.Schema({
  
  title: String,
  status: String,
  description: String,
  author: String,
  Requirements: String,
  team: String,
  date: String,
  location: String,
  avatar: String,
  tags: [String]
});

module.exports = mongoose.model("Hackathon", HackathonSchema);
