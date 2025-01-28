const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cost-estimator';

const dbConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true
};

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(MONGODB_URI, dbConfig);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
