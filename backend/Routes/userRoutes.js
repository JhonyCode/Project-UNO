const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

router.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new User({ username, email, password }); 
    await newUser.save();
    res.status(201).json(newUser); // Devolvemos el usuario creado
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

module.exports = router;
