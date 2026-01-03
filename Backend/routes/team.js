const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

// Create a new team entry
router.post('/create', async (req, res) => {
    console.log("REQ BODY =>", req.body);

    try {
        const { projectId, title, author } = req.body;

        const team = new Team({
            projectId,
            title,
            author
        });

        await team.save();

        res.status(201).json({
            message: "Team created successfully",
            team
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Fetch all teams
router.get("/", async (req, res) => {
    const data = await Team.find();
    res.json(data);
});

module.exports = router;
