const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Configuración del puerto
const port = process.env.PORT || 8000;

// Middleware
app.use(cors()); 
app.use(express.json()); // Para poder parsear los cuerpos de las solicitudes en formato JSON

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Rutas de la API
const todoRoutes = require('./api/todo');
app.use('/api/todos', todoRoutes);  // Configura las rutas de TODOs

// Ruta principal de prueba
app.get('/', (req, res) => {
  res.send('Servidor corriendo');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
const path = require('path');

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});



