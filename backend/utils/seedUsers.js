const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const seedUsers = async () => {
  const users = [
    { username: 'Player1', email: 'player1@example.com', password: 'password1' },
    { username: 'Player2', email: 'player2@example.com', password: 'password2' },
    { username: 'Player3', email: 'player3@example.com', password: 'password3' },
    { username: 'Player4', email: 'player4@example.com', password: 'password4' },
  ];

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');

    // Borra usuarios existentes y crea nuevos
    await User.deleteMany();
    const createdUsers = await User.insertMany(users);
    
    console.log('Users created:', createdUsers);
    mongoose.connection.close(); // Cerrar la conexión
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

seedUsers();
