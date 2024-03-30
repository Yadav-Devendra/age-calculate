const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
const uri = process.env.ATLAS_URI || 'mongodb://localhost:27017/age-calculator';
mongoose.connect(uri)
    .then(() => console.log('MongoDB database connection established successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define Mongoose schema and model
const ageSchema = new mongoose.Schema({
  yearOfBirth: Number,
  calculatedAge: Number,
});

const Age = mongoose.model('Age', ageSchema);

// Middleware
app.use(cors());
app.use(express.json());

// API endpoint to store age data
app.post('/api/ages', async (req, res) => {
  const { yearOfBirth } = req.body;
  const currentYear = new Date().getFullYear();
  const calculatedAge = currentYear - yearOfBirth;

  const newAge = new Age({ yearOfBirth, calculatedAge });

  try {
    await newAge.save();
    res.status(201).json(newAge);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});