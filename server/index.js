const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const dbUtils = require('./utils/dbUtils');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to database
connectDB();

// Model data endpoint
app.get('/api/model-data', async (req, res) => {
  try {
    const materials = await dbUtils.getMaterials();
    const modelData = {
      geometries: require('./data/model-data.json').geometries,
      materials
    };
    res.json(modelData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load model data' });
  }
});

// Save configuration endpoint
app.post('/api/save-config', async (req, res) => {
  try {
    const config = await dbUtils.saveConfiguration(req.body);
    res.json({ success: true, id: config._id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save configuration' });
  }
});

// Load configuration endpoint
app.get('/api/load-config/:id', async (req, res) => {
  try {
    const config = await dbUtils.getConfiguration(req.params.id);
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load configuration' });
  }
});

// Material presets endpoint
app.get('/api/material-presets', async (req, res) => {
  try {
    const materials = await dbUtils.getMaterials();
    res.json({ presets: materials });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load material presets' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
