const mongoose = require('mongoose');

const cartaSchema = new mongoose.Schema({
  color: { type: String, required: true },
  valor: { type: Number, required: true },
  tipo: { type: String, enum: ['normal', 'especial'], required: true },
});

const Carta = mongoose.model('Carta', cartaSchema);
module.exports = Carta;