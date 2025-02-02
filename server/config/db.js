const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB:', conn.connection.host);
  } catch (err) {
    console.error('Error al conectar con MongoDB:', err.message);
    process.exit(1); // Detener la aplicación si la conexión falla
  }
};

module.exports = connectDB;




