const express = require('express');
const connectDB = require('./config/db');  
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');

// Cargar las variables de entorno
dotenv.config();

// Crear la aplicación de Express
const app = express();

// Usar Helmet con configuración personalizada de CSP
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "https://frontendbackendapp.onrender.com"],  // Permitir imágenes
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],  // Permitir estilos en línea
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    }
  })
);

// Middlewares
app.use(helmet());  // Usar Helmet para otras configuraciones de seguridad
app.use(cors());
app.use(express.json());

// Importar las rutas
const todoRoutes = require('./routes/todo');

// Usar las rutas
app.use('/api', todoRoutes);

// Conectar a la base de datos
connectDB();  

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

