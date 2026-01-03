const mongoose = require("mongoose");
const Project = require("./models/Project");
const Hackathon = require("./models/Hackathon");
const Startup = require("./models/Startup");

const data = require("../Frontend/data.json"); 

// Connect to DB
require("dotenv").config();
require("./config/db");

// Clear old data (optional)
  Project.deleteMany({});
  Hackathon.deleteMany({});
  Startup.deleteMany({});

async function seed() {
    console.log("hello")
  await Project.deleteMany({});
  await Hackathon.deleteMany({});
  await Startup.deleteMany({});

  // Insert new data
  await Project.insertMany(data.projects);
  await Hackathon.insertMany(data.hackathons);
  await Startup.insertMany(data.startups);

  console.log("Database seeded!");
  mongoose.disconnect();
}

seed();
