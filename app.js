const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const estudianteRoutes = require('./src/routes/estudianteRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/usuarios', usuarioRoutes);

module.exports = app;
