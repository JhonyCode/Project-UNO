const express = require('express');
const generateDeck = require('../utils/generateDeck'); 
const router = express.Router();

router.get('/generate-deck', async (req, res) => {
  try {
    const mazo = await generateDeck(); // Llama a la función que genera el mazo
    res.json(mazo); // Devuelve el mazo generado
  } catch (error) {
    console.error('Error while generating deck:', error);
    res.status(500).json({ error: 'Error while generating deck' });
  }
});

module.exports = router;
