const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

describe('Estudiantes CRUD', () => {
  let adminToken = '';

  beforeAll(async () => {
    // Conexión a la BD si no está conectada
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/test_estudiantes');
    }

    // Login como admin para obtener token
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'christian', // Cambia por tu usuario admin
        password: '123456'     // Cambia por tu contraseña admin
      });

    if (loginRes.statusCode === 200) {
      adminToken = loginRes.body.token;
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('debe listar estudiantes con token de admin', async () => {
    const res = await request(app)
      .get('/api/estudiantes')
      .set('Authorization', `Bearer ${adminToken}`);
    
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('debe crear un estudiante con token de admin', async () => {
    const nuevo = {
      nombre: "Carlos",
      apellido: "Lopez",
      fechaNacimiento: "2000-05-05",
      email: "carlos@email.com"
    };

    const res = await request(app)
      .post('/api/estudiantes')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(nuevo);

    expect(res.statusCode).toBe(201);
    expect(res.body.estudiante).toBeDefined();
    expect(res.body.estudiante.email).toBe(nuevo.email);
  });

  it('NO debe permitir acceso sin token', async () => {
    const res = await request(app).get('/api/estudiantes');
    expect(res.statusCode).toBe(401);
  });

  it('debe actualizar un estudiante', async () => {
    // Primero crear un estudiante
    const nuevo = {
      nombre: "Ana",
      apellido: "Martinez",
      fechaNacimiento: "1999-03-15",
      email: "ana@email.com"
    };

    const createRes = await request(app)
      .post('/api/estudiantes')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(nuevo);

    const estudianteId = createRes.body.estudiante._id;

    // Ahora actualizar
    const actualizado = {
      nombre: "Ana María",
      apellido: "Martinez Silva"
    };

    const updateRes = await request(app)
      .put(`/api/estudiantes/${estudianteId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send(actualizado);

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.estudiante.nombre).toBe("Ana María");
  });
});