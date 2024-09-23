const express = require('express');
const router = express.Router();
const { Usuario, Partida, Carta } = require('../models/Index');

// Ejemplo de ruta para obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;