const mongoose = require('mongoose');

const ConfigurationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  materials: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material'
  }],
  geometries: [{
    id: String,
    vertices: [Number],
    faces: [Number],
    metadata: {
      type: String,
      name: String
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Configuration', ConfigurationSchema);
