const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'estudiante'], default: 'estudiante' }
}, {
  timestamps: true,
  autoCreate: true,
  autoIndex: true
});

module.exports = mongoose.model('User', userSchema);
