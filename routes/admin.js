const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Skill = require('../models/Skill');

// Add Project Page
router.get('/add-project', (req, res) => {
  res.render('admin/add-project');
});

// Add Project Form Submission
router.post('/add-project', async (req, res) => {
  const { title, description, imageUrl, githubLink } = req.body;
  const project = new Project({ title, description, imageUrl, githubLink });
  await project.save();
  res.redirect('/admin/add-project');
});

// Add Skill Page
router.get('/add-skill', (req, res) => {
  res.render('admin/add-skill');
});

// Add Skill Form Submission
router.post('/add-skill', async (req, res) => {
  const { name, proficiency } = req.body;
  const skill = new Skill({ name, proficiency });
  await skill.save();
  res.redirect('/admin/add-skill');
});

module.exports = router;