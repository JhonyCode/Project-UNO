const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },  // Nombre único del jugador
  email: { type: String, required: true, unique: true },     // Email para el inicio de sesión del usuario
  password: { type: String, required: true },                // Contraseña encriptada para autenticación
  cardsInHand: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }], // Cartas que el jugador tiene en mano
  status: { type: String, enum: ['playing', 'waiting', 'winner'], default: 'waiting' }, // Estado del jugador en el juego
  currentGame: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' } // Referencia al juego actual
});

const User = mongoose.model('User', userSchema);
module.exports = User;
