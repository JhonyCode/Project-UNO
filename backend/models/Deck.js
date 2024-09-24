const mongoose = require('mongoose');

// Define el esquema de carta
const cardSchema = new mongoose.Schema({
  color: { type: String, enum: ['red', 'green', 'blue', 'yellow', null], required: false },
  value: { type: String, required: true }, // Número o tipo de carta especial
  type: { type: String, enum: ['normal', 'special'], required: true },
  playable: { type: Boolean, default: true }
});

// Define el esquema de mazo
const deckSchema = new mongoose.Schema({
  cards: [cardSchema],  // Arreglo de cartas
  inUse: { type: Boolean, default: false } // Asegúrate de que inUse esté aquí
});

// Crea el modelo de Deck
const Deck = mongoose.model('Deck', deckSchema);
module.exports = Deck;
