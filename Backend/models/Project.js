const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  
  title: String,
  status: String,
  description: String,
  author: String,
  avatar: String,
  team: String,
  location: String,
  tags: [String]
});

module.exports = mongoose.model("Project", ProjectSchema);
