const mongoose = require('mongoose');
const User = require('../models/User');
const Game = require('../models/Game');
const Card = require('../models/Card');
const Deck = require('../models/Deck');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');

    // Crea las colecciones si no existen
    await User.createCollection().catch((error) => console.log('Collection already exists:', error));
    await Game.createCollection().catch((error) => console.log('Collection already exists:', error));
    await Card.createCollection().catch((error) => console.log('Collection already exists:', error));
    await Deck.createCollection().catch((error) => console.log('Collection already exists:', error));

    console.log('Collections initialized.');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);  // Stops the application if the connection fails
  }
};

module.exports = connectDB;
