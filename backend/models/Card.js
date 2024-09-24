const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  color: { type: String, enum: ['red', 'green', 'blue', 'yellow', null] }, // null para comodines
  value: { type: String, required: true }, // Valor de la carta (número o especial)
  type: { type: String, enum: ['normal', 'special'], required: true }, // Tipo de carta
  playable: { type: Boolean, default: true }, // Si la carta se puede jugar
});

const Card = mongoose.model('Card', cardSchema);
module.exports = Card;
