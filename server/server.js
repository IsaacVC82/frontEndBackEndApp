const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');

// Cargar las variables de entorno
dotenv.config();

const app = express();

// Importar las rutas
const todoRoutes = require('./routes/todo');

// Configuración de CSP (Content Security Policy)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],  // Restringir todo a la misma fuente
      scriptSrc: ["'self'"],  // Permitir scripts de la misma fuente
      styleSrc: ["'self'", "'unsafe-inline'"],  // Permitir estilos
      imgSrc: ["'self'", "https://frontendbackendapp.onrender.com"],  // Permitir imágenes 
      connectSrc: ["'self'"],  // Permitir conexiones a la misma fuente
      fontSrc: ["'self'"],  // Permitir fuentes desde la misma fuente
      objectSrc: ["'none'"],  // Deshabilitar objetos (como Flash)
      frameSrc: ["'none'"],  // Deshabilitar iframes
    },
  })
);

// Otros middlewares
app.use(cors());
app.use(express.json());

// Usar las rutas
app.use('/api', todoRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
