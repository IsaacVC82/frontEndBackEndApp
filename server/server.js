const express = require('express');
const connectDB = require('./config/db');  
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');

// Cargar las variables de entorno
dotenv.config();

// Crear la aplicación de Express
const app = express();

// Importar las rutas
const todoRoutes = require('./routes/todo');

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Usar las rutas
app.use('/api', todoRoutes);  

// Conectar a la base de datos
connectDB();  

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
