const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/usuarioRepository");
const estudianteRepository = require("../repositories/estudianteRepository");

class AuthService {
  async register(userData) {
    const existingUser = await userRepository.findByUsername(userData.username);
    if (existingUser) {
      throw new Error("Usuario ya existe");
    }

    const passwordHash = await bcrypt.hash(userData.password, 10);

    const newUser = await userRepository.create({
      username: userData.username,
      passwordHash: passwordHash,
      role: userData.role || "estudiante",
    });

    const { passwordHash: _, ...userWithoutPassword } = newUser.toObject();
    return userWithoutPassword;
  }

  async login(username, password) {
    const user = await userRepository.findByUsername(username);
    if (!user) {
      throw new Error("Usuario o contraseña incorrectos");
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new Error("Usuario o contraseña incorrectos");
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { passwordHash: _, ...userWithoutPassword } = user.toObject();
    return { user: userWithoutPassword, token };
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error("Token inválido o expirado");
    }
  }

  async getUserById(userId) {
    const user = await userRepository.findById(userId);
    if (!user) throw new Error("Usuario no encontrado");

    const { passwordHash, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }

  async getEstudianteByUsername(username) {
  // Buscar usuario primero
  const user = await userRepository.findByUsername(username);
  if (!user) throw new Error("Usuario no encontrado");

  // Buscar estudiante por usuarioId
  const estudiante = await estudianteRepository.findByUsuarioId(user._id);
  if (!estudiante) throw new Error("Estudiante no encontrado");

  return estudiante;
}


}

module.exports = new AuthService();
