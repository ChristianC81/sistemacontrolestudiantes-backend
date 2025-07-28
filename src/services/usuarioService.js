const usuarioRepository = require('../repositories/usuarioRepository');

class UsuarioService {
  async getAllUsuarios() {
    return await usuarioRepository.findAll();
  }

  async getUsuarioById(id) {
    const usuario = await usuarioRepository.findById(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    return usuario;
  }

  async createUsuario(usuarioData) {
    const existingUsuario = await usuarioRepository.findByEmail(usuarioData.email);
    if (existingUsuario) {
      throw new Error('Ya existe un usuario con ese email');
    }

    return await usuarioRepository.create(usuarioData);
  }

  async updateUsuario(id, usuarioData) {
    const usuario = await usuarioRepository.findById(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    if (usuarioData.email && usuarioData.email !== usuario.email) {
      const existingUsuario = await usuarioRepository.findByEmail(usuarioData.email);
      if (existingUsuario) {
        throw new Error('Ya existe un usuario con ese email');
      }
    }

    return await usuarioRepository.update(id, usuarioData);
  }

  async deleteUsuario(id) {
    const usuario = await usuarioRepository.findById(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    await usuarioRepository.delete(id);
    return { message: 'Usuario eliminado correctamente' };
  }
}

module.exports = new UsuarioService();