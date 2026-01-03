const express = require("express");
const Project = require("../models/Project");
const router = express.Router();

// GET all projects
router.get("/", async (req, res) => {
  const data = await Project.find();
  res.json(data);
});

router.post('/', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json({ message: 'Project created!', project });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }

});
module.exports = router;

