const Material = require('../models/Material');
const Configuration = require('../models/Configuration');

const dbUtils = {
  async getMaterials() {
    return await Material.find({}).sort({ createdAt: -1 });
  },

  async saveMaterial(materialData) {
    const material = new Material(materialData);
    return await material.save();
  },

  async saveConfiguration(configData) {
    const config = new Configuration(configData);
    return await config.save();
  },

  async getConfiguration(id) {
    return await Configuration.findById(id).populate('materials');
  },

  async updateMaterial(id, updates) {
    return await Material.findByIdAndUpdate(id, updates, { new: true });
  },

  async deleteMaterial(id) {
    return await Material.findByIdAndUpdate(id);
  }
};

module.exports = dbUtils;
