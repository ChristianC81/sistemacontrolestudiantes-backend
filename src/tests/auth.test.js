const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
require('dotenv').config();

let token = "";

describe("Auth Endpoints", () => {
  beforeAll(async () => {
    // Asegurar que tenemos la URI de MongoDB
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/test_estudiantes';
    
    // Conexión a la BD si no está conectada
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri);
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("Login exitoso con credenciales válidas", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        username: "christian", // Asegúrate que este usuario existe
        password: "123456",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.message).toBe("Login exitoso");
    token = res.body.token;
  });

  it("Login fallido con credenciales inválidas", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        username: "usuarioInexistente",
        password: "passwordIncorrecto",
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe(true);
  });

  it("Verificación de token válido", async () => {
    const res = await request(app)
      .get("/api/auth/verify")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("valid", true);
    expect(res.body).toHaveProperty("user");
  });

  it("Verificación falla sin token", async () => {
    const res = await request(app)
      .get("/api/auth/verify");

    expect(res.statusCode).toBe(401);
    expect(res.body.valid).toBe(false);
  });

  it("Verificación falla con token inválido", async () => {
    const res = await request(app)
      .get("/api/auth/verify")
      .set("Authorization", "Bearer token_invalido");

    expect(res.statusCode).toBe(401);
    expect(res.body.valid).toBe(false);
  });
});