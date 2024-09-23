const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: false, unique: true, lowercase: true },
  password: { type: String, required: true },
  cartasEnMano: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Carta' }],
  estado: { type: String, enum: ['jugando', 'esperando', 'ganador'], required: true },
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;