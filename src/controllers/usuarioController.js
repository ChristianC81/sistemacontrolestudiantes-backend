const usuarioService = require('../services/usuarioService');

class UsuarioController {
  async getAllUsuarios(req, res) {
    try {
      const usuarios = await usuarioService.getAllUsuarios();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ 
        error: true, 
        message: error.message 
      });
    }
  }

  async getUsuarioById(req, res) {
    try {
      const usuario = await usuarioService.getUsuarioById(req.params.id);
      res.status(200).json(usuario);
    } catch (error) {
      res.status(404).json({ 
        error: true, 
        message: error.message 
      });
    }
  }

  async createUsuario(req, res) {
    try {
      const usuario = await usuarioService.createUsuario(req.body);
      res.status(201).json({
        message: 'Usuario creado exitosamente',
        usuario
      });
    } catch (error) {
      res.status(400).json({ 
        error: true, 
        message: error.message 
      });
    }
  }

  async updateUsuario(req, res) {
    try {
      const usuario = await usuarioService.updateUsuario(
        req.params.id, 
        req.body
      );
      res.status(200).json({
        message: 'Usuario actualizado exitosamente',
        usuario
      });
    } catch (error) {
      res.status(400).json({ 
        error: true, 
        message: error.message 
      });
    }
  }

  async deleteUsuario(req, res) {
    try {
      const result = await usuarioService.deleteUsuario(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ 
        error: true, 
        message: error.message 
      });
    }
  }
}

module.exports = new UsuarioController();