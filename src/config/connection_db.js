const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL)
    console.log('Conexion a la base de datos exitosa');
  } catch (error) {
    console.error('Conexion a la base de datos fallida:', error.message);
    process.exit(1);
  }
}
module.exports = connectDB;