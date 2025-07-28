const mongoose = require('mongoose');

const estudianteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  direccion: String,
  telefono: String,
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, {
  timestamps: true,
  autoCreate: true,
  autoIndex: true
});

// Opcional: métodos o virtuales
estudianteSchema.methods.fullName = function() {
  return `${this.nombre} ${this.apellido}`;
};

module.exports = mongoose.model('Estudiante', estudianteSchema);
