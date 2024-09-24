const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  color: { type: String, enum: ['red', 'green', 'blue', 'yellow', null], required: true },
  value: { type: String, required: true }, // Número o tipo de carta especial
  type: { type: String, enum: ['normal', 'special'], required: true },
  playable: { type: Boolean, default: true } // Estado jugable
});

const Card = mongoose.model('Card', cardSchema);
module.exports = Card;
