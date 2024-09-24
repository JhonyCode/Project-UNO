const express = require('express');
const router = express.Router();
const gameController = require('../controllers/GameController'); 

router.post('/', gameController.postGames); // Ruta para crear un juego

module.exports = router;
