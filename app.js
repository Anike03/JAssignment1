const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

// Models
const Project = require('./models/Project');
const Skill = require('./models/Skill');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Enable CORS for frontend API access
app.use(cors());

// Serve static files and parse form data
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Pug templating for admin pages
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Admin routes
const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

// Home page (for legacy site)
app.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    const skills = await Skill.find();
    res.render('index', { projects, skills });
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Error fetching data');
  }
});

// --- New API Endpoints for React frontend ---

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.get('/api/skills', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
