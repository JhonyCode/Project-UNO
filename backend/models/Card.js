const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  color: { type: String, enum: ['red', 'green', 'blue', 'yellow', null], required: false },
  value: { type: String, required: true }, // Número o tipo de carta especial
  type: { type: String, enum: ['normal', 'special'], required: true },
  playable: { type: Boolean, default: true }
});

const Card = mongoose.model('Card', cardSchema);
module.exports = Card;