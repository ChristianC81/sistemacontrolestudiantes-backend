const express = require("express");
const router = express.Router();
const estudianteController = require("../controllers/estudianteController");
const authenticateToken = require("../middleware/authMiddleware");

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
router.get("/:id", authenticateToken, estudianteController.getEstudianteById);
router.put("/:id", authenticateToken, estudianteController.updateEstudiante);
router.get("/usuario/:usuarioId", authenticateToken, estudianteController.getByUsuarioId);

// Rutas protegidas por token y rol de administrador
router.get(
  "/",
  authenticateToken,
  checkRole(["admin"]),
  estudianteController.getAllEstudiantes
);
router.post(
  "/",
  authenticateToken,
  checkRole(["admin"]),
  estudianteController.createEstudiante
);
router.delete(
  "/:id",
  authenticateToken,
  checkRole(["admin"]),
  estudianteController.deleteEstudiante
);

module.exports = router;
