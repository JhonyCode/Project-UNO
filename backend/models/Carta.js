const mongoose = require('mongoose');

const cartaSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Campo ID numérico único
  color: { type: String, enum: ['rojo', 'verde', 'azul', 'amarillo', null], required: true },
  valor: { type: String, required: true }, // Número o tipo de carta especial
  tipo: { type: String, enum: ['normal', 'especial'], required: true },
  jugable: { type: Boolean, default: true } // Estado jugable
});

const Carta = mongoose.model('Carta', cartaSchema);
module.exports = Carta;
