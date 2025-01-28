const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  color: {
    r: Number,
    g: Number,
    b: Number,
    a: Number
  },
  defaultCost: {
    type: Number,
    required: true
  },
  layers: [{
    material: String,
    thickness: Number,
    cost: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Material', MaterialSchema);
