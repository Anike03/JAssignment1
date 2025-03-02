const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Import models
const Project = require('./models/Project');
const Skill = require('./models/Skill');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Set up Pug as the template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Routes
const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

// Home route (fetch data from MongoDB)
app.get('/', async (req, res) => {
  try {
    const projects = await Project.find(); // Fetch all projects
    const skills = await Skill.find(); // Fetch all skills
    res.render('index', { projects, skills }); // Pass data to the template
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Error fetching data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});