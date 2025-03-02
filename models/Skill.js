const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  proficiency: { type: String, required: true }, // e.g., Beginner, Intermediate, Advanced
});

module.exports = mongoose.model('Skill', skillSchema);