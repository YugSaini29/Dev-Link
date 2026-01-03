const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    projectId: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Team', TeamSchema);
