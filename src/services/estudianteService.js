const estudianteRepository = require("../repositories/estudianteRepository");

class EstudianteService {
  async getAllEstudiantes() {
    return await estudianteRepository.findAll();
  }

  async getEstudianteById(id) {
    const estudiante = await estudianteRepository.findById(id);
    if (!estudiante) {
      throw new Error("Estudiante no encontrado");
    }
    return estudiante;
  }
  
  async findByUsuarioId(usuarioId) {
    return await estudianteRepository.findByUsuarioId(usuarioId);
  }

  async createEstudiante(estudianteData) {
    const existingEstudiante = await estudianteRepository.findByEmail(
      estudianteData.email
    );
    if (existingEstudiante) {
      throw new Error("Ya existe un estudiante con ese email");
    }

    return await estudianteRepository.create(estudianteData);
  }

  async updateEstudiante(id, estudianteData) {
    const estudiante = await estudianteRepository.findById(id);
    if (!estudiante) {
      throw new Error("Estudiante no encontrado");
    }

    if (estudianteData.email && estudianteData.email !== estudiante.email) {
      const existingEstudiante = await estudianteRepository.findByEmail(
        estudianteData.email
      );
      if (existingEstudiante) {
        throw new Error("Ya existe un estudiante con ese email");
      }
    }

    return await estudianteRepository.update(id, estudianteData);
  }

  async deleteEstudiante(id) {
    const estudiante = await estudianteRepository.findById(id);
    if (!estudiante) {
      throw new Error("Estudiante no encontrado");
    }

    await estudianteRepository.delete(id);
    return { message: "Estudiante eliminado correctamente" };
  }
}

module.exports = new EstudianteService();
