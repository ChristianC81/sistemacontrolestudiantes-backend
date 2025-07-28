const express = require('express');
const cors = require('cors');
const client = require('prom-client'); // Agrega esta línea

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

// --- MONITORIZACIÓN ---

// Crear un contador para número de peticiones
const requestCount = new client.Counter({
  name: 'http_requests_total',
  help: 'Número total de peticiones HTTP',
  labelNames: ['method', 'route', 'status_code'],
});

// Crear un histograma para tiempo de respuesta
const responseTimeHistogram = new client.Histogram({
  name: 'http_response_time_seconds',
  help: 'Tiempo de respuesta HTTP en segundos',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 1.5, 2, 5],
});

// Middleware para recolectar métricas
app.use((req, res, next) => {
  const end = responseTimeHistogram.startTimer();
  res.on('finish', () => {
    requestCount.inc({ method: req.method, route: req.route ? req.route.path : req.path, status_code: res.statusCode });
    end({ method: req.method, route: req.route ? req.route.path : req.path, status_code: res.statusCode });
  });
  next();
});

// Endpoint para Prometheus scrape
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/usuarios', usuarioRoutes);

module.exports = app;
