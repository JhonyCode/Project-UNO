const mongoose = require('mongoose');

// Define el esquema del juego
const gameSchema = new mongoose.Schema({
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Lista de jugadores
  deck: { type: mongoose.Schema.Types.ObjectId, ref: 'Deck' }, // Referencia al mazo
  playedCards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }], // Cartas jugadas
  currentPlayer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Jugador en turno
  status: { type: String, enum: ['in progress', 'finished'], required: true }, // Estado de la partida
  assignedCards: [ // Cartas asignadas a cada jugador
    {
      player: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
      cards: [{ type: Object }] 
    }
  ]
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
