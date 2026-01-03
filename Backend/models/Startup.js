const mongoose = require("mongoose");

const StartupSchema = new mongoose.Schema({
  
  title: String,
  status: String,
  description: String,
  author: String,
  Requirements: String,
  avatar: String,
  team: String,
  location: String,
  tags: [String]
});

module.exports = mongoose.model("Startup", StartupSchema);
