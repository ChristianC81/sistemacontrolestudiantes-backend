const Estudiante = require("../models/estudianteModel");

class EstudianteRepository {
  async findAll() {
    return await Estudiante.find();
  }

  async findById(id) {
    return await Estudiante.findById(id).populate("usuarioId");
  }

  async findByEmail(email) {
    return await Estudiante.findOne({ email });
  }

  async findByUsuarioId(usuarioId) {
    return await Estudiante.findOne({ usuarioId }).populate("usuarioId");
  }

  async create(estudianteData) {
    const estudiante = new Estudiante(estudianteData);
    return await estudiante.save();
  }

  async update(id, estudianteData) {
    return await Estudiante.findByIdAndUpdate(id, estudianteData, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return await Estudiante.findByIdAndDelete(id);
  }
}

module.exports = new EstudianteRepository();
