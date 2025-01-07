const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ambulance Schema
const ambulanceSchema = new mongoose.Schema({
  id: Number,
  marque: String,
  modele: String,
  couleur: String,
});

const Ambulance = mongoose.model('Ambulance', ambulanceSchema);

// Routes
app.get('/ambulances', async (req, res) => {
  try {
    const ambulances = await Ambulance.find();
    res.status(200).json(ambulances);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching ambulances' });
  }
});

app.post('/ambulances', async (req, res) => {
  try {
    const newAmbulance = new Ambulance(req.body);
    await newAmbulance.save();
    res.status(201).json(newAmbulance);
  } catch (error) {
    res.status(500).json({ error: 'Error adding ambulance' });
  }
});

app.get('/ambulances/:id', async (req, res) => {
  try {
    const ambulance = await Ambulance.findOne({ id: req.params.id });
    if (ambulance) {
      res.status(200).json(ambulance);
    } else {
      res.status(404).json({ error: 'Ambulance not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching ambulance' });
  }
});

app.put('/ambulances/:id', async (req, res) => {
  try {
    const updatedAmbulance = await Ambulance.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (updatedAmbulance) {
      res.status(200).json(updatedAmbulance);
    } else {
      res.status(404).json({ error: 'Ambulance not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating ambulance' });
  }
});

app.delete('/ambulances/:id', async (req, res) => {
  try {
    const deletedAmbulance = await Ambulance.findOneAndDelete({ id: req.params.id });
    if (deletedAmbulance) {
      res.status(200).json(deletedAmbulance);
    } else {
      res.status(404).json({ error: 'Ambulance not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting ambulance' });
  }
});

// Export the app without starting the server
module.exports = app;
