const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController'); 

router.post('/', gameController.postGames); // Ruta para crear un juego

module.exports = router;
