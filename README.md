# Sistema Control Estudiantes

Proyecto completo para la gestión de estudiantes, compuesto por:
- Backend: API REST con Node.js, Express y MongoDB  
- Frontend: Aplicación web con Angular 20

---

## Backend

App Backend para la gestión de estudiantes, construida con Node.js, Express y MongoDB.

### Tecnologías

- Node.js  
- Express 5  
- MongoDB + Mongoose  
- JWT para autenticación  
- Jest + Supertest para pruebas automatizadas  

### Instalación

1. **Clonar el repositorio:**
```bash
git clone https://tu-repo-backend.git
cd sistemacontrolestudiantes-backend
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno en archivo .env:**
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/sistemacontrolestudiantes
JWT_SECRET=tu_secreto_jwt
```

4. **Ejecutar en modo desarrollo:**
```bash
npm run dev
```

5. **Ejecutar pruebas:**
```bash
npm test
```

### Uso

- El servidor corre en: http://localhost:3000
- API REST para gestión de estudiantes, autenticación, etc.

### Despliegue

Desplegado en: https://sistemacontrolestudiantes-backend.onrender.com/

## Monitorización
- Integración básica con backend para métricas
- Logs y alertas visuales en consola
  
Monitorización: https://sistemacontrolestudiantes-backend.onrender.com/metrics
