const estudianteService = require('../services/estudianteService');

class EstudianteController {
  async getAllEstudiantes(req, res) {
    try {
      const estudiantes = await estudianteService.getAllEstudiantes();
      res.status(200).json(estudiantes);
    } catch (error) {
      res.status(500).json({ 
        error: true, 
        message: error.message 
      });
    }
  }

  async getEstudianteById(req, res) {
    try {
      const estudiante = await estudianteService.getEstudianteById(req.params.id);
      res.status(200).json(estudiante);
    } catch (error) {
      res.status(404).json({ 
        error: true, 
        message: error.message 
      });
    }
  }

  async getByUsuarioId(req, res) {
    try {
      const { usuarioId } = req.params;
      const estudiante = await estudianteService.findByUsuarioId(usuarioId);
      if (!estudiante) {
        return res.status(404).json({ message: "Estudiante no encontrado" });
      }
      res.json(estudiante);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  async createEstudiante(req, res) {
    try {
      const estudiante = await estudianteService.createEstudiante(req.body);
      res.status(201).json({
        message: 'Estudiante creado exitosamente',
        estudiante
      });
    } catch (error) {
      res.status(400).json({ 
        error: true, 
        message: error.message 
      });
    }
  }

  async updateEstudiante(req, res) {
    try {
      const estudiante = await estudianteService.updateEstudiante(
        req.params.id, 
        req.body
      );
      res.status(200).json({
        message: 'Estudiante actualizado exitosamente',
        estudiante
      });
    } catch (error) {
      res.status(400).json({ 
        error: true, 
        message: error.message 
      });
    }
  }

  async deleteEstudiante(req, res) {
    try {
      const result = await estudianteService.deleteEstudiante(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ 
        error: true, 
        message: error.message 
      });
    }
  }
}

module.exports = new EstudianteController();