require("dotenv").config();
require("./config/db.js");

const projectsRoute = require("./routes/projects");
const hackathonsRoute = require("./routes/hackathons");
const startupsRoute = require("./routes/startups");

const express = require("express");
const cors = require("cors");
const app = express();
const projectRoutes = require('./routes/projects');
const teamRoutes = require('./routes/team'); 
app.use(cors());
app.use(express.json());
// API ROUTES
app.use("/api/projects", projectsRoute);
app.use("/api/hackathons", hackathonsRoute);
app.use("/api/startups", startupsRoute);
// Serve frontend
app.use(express.static("../Frontend"));


app.get("/", (req, res) => {
  res.sendFile("home.html", { root: "../Frontend" });
});

app.use(express.urlencoded({ extended: true })); // for form data
app.use('/projects', projectRoutes);
app.use('/team', teamRoutes); // <-- register team routes

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

