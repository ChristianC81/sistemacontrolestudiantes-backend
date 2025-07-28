const authService = require("../../services/authService");

class AuthController {
  async register(req, res) {
    try {
      const userData = {
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
      };

      const user = await authService.register(userData);
      res.status(201).json({
        message: "Usuario registrado exitosamente",
        user,
      });
    } catch (error) {
      res.status(400).json({
        error: true,
        message: error.message,
      });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const result = await authService.login(username, password);

      res.status(200).json({
        message: "Login exitoso",
        ...result,
      });
    } catch (error) {
      res.status(401).json({
        error: true,
        message: error.message,
      });
    }
  }

  async verify(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw new Error("Token no proporcionado");

      const decoded = authService.verifyToken(token);
      const user = await authService.getUserById(decoded.userId);
      const estudiante = await authService.getEstudianteByUsername(
        user.username
      );

      res.status(200).json({
        valid: true,
        decoded,
        user,
        estudiante,
      });
    } catch (error) {
      res.status(401).json({
        valid: false,
        message: error.message,
      });
    }
  }
}

module.exports = new AuthController();
