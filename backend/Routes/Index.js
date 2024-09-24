const express = require('express');
const router = express.Router();

const cardRoutes = require('./cardRoutes');  // Importar las rutas de Card
const userRoutes = require('./userRoutes');   // Importar las rutas de User
const gameRoutes = require('./gameRoutes');    // Importar las rutas de Game
const deckRoutes = require('./deckRoutes'); // Importar las rutas de Deck

// Usar las rutas importadas
router.use('/cards', cardRoutes);  // Acceder a /cards
router.use('/users', userRoutes);   // Acceder a /users
router.use('/games', gameRoutes);    // Acceder a /games
router.use('/deck', deckRoutes);     // Acceder a /deck

module.exports = router;
