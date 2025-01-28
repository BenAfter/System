const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Model data endpoint
app.get('/api/model-data', (req, res) => {
  try {
    const modelData = require('./data/model-data.json');
    res.json(modelData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load model data' });
  }
});

// Save configuration endpoint
app.post('/api/save-config', (req, res) => {
  try {
    const config = req.body;
    // Save logic here
    res.json({ success: true, id: Date.now() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save configuration' });
  }
});

// Load configuration endpoint
app.get('/api/load-config/:id', (req, res) => {
  try {
    const { id } = req.params;
    // Load logic here
    res.json({ /* configuration data */ });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load configuration' });
  }
});

// Material presets endpoint
app.get('/api/material-presets', (req, res) => {
  try {
    const presets = require('./data/material-presets.json');
    res.json(presets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load material presets' });
  }
});

// Export report endpoint
app.post('/api/export-report', (req, res) => {
  try {
    const reportData = req.body;
    // Report generation logic here
    res.json({ success: true, url: 'path/to/report' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
