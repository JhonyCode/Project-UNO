const mongoose = require('mongoose');

const cartaSchema = new mongoose.Schema({
  color: { type: String, enum: ['rojo', 'verde', 'azul', 'amarillo', null], required: true },
  valor: { type: String, required: true }, // Número o tipo de carta especial
  tipo: { type: String, enum: ['normal', 'especial'], required: true }
});

const Carta = mongoose.model('Carta', cartaSchema);
module.exports = Carta;