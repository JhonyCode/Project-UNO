const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Lista de jugadores
  deck: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }], // Mazo de cartas
  playedCards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }], // Cartas jugadas
  currentPlayer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Jugador en turno
  status: { type: String, enum: ['in progress', 'finished'], required: true }, // Estado de la partida
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
