const mongoose = require('mongoose');

const partidaSchema = new mongoose.Schema({
  jugadores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
  mazo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Carta' }],
  cartasJugadas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Carta' }],
  jugadorEnTurno: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  estado: { type: String, enum: ['en curso', 'finalizada'], required: true },
});

const Partida = mongoose.model('Partida', partidaSchema);
module.exports = Partida;