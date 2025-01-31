const mongoose = require('mongoose');
require("dotenv").config(); 

// Función para conectar con la base de datos
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
    });
    console.log('Conexión a MongoDB exitosa');
  } catch (err) {
    console.error('Error al conectar con MongoDB:', err);
    process.exit(1); // Finalizar la aplicación si la conexión falla
  }
};

module.exports = connectDB;

