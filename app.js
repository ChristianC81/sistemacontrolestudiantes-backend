const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const estudianteRoutes = require('./src/routes/estudianteRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');

const app = express();

// Configurar CORS para permitir el dominio de Netlify
app.use(cors({
  origin: 'https://monumental-seahorse-0e87bf.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/usuarios', usuarioRoutes);

module.exports = app;
