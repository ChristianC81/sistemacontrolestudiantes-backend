const express = require("express");
const router = express.Router();
const authController = require("../controllers/security/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/verify", authController.verify);

module.exports = router;
