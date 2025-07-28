const express = require("express");
const router = express.Router();
const estudianteController = require("../controllers/estudianteController");
const authenticateToken = require("../middleware/authMiddleware");
const usuarioController = require("../controllers/usuarioController");

// Middleware para verificar roles
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "No tiene permisos para realizar esta acción",
      });
    }
    next();
  };
};

// Rutas protegidas por token
router.get("/:id", authenticateToken, usuarioController.getUsuarioById);
router.put("/:id", authenticateToken, usuarioController.updateUsuario);

// Rutas protegidas por token y rol de administrador
router.get(
  "/",
  authenticateToken,
  checkRole(["admin"]),
  usuarioController.getAllUsuarios
);
router.post(
  "/",
  authenticateToken,
  checkRole(["admin"]),
  usuarioController.createUsuario
);
router.delete(
  "/:id",
  authenticateToken,
  checkRole(["admin"]),
  usuarioController.deleteUsuario
);

module.exports = router;
