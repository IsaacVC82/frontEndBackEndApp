const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const todoHandler = require('./api/todo');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/api/todo', todoHandler);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor Express está funcionando correctamente!');
});

// Conexión a la base de datos y servidor
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('No se pudo conectar a la base de datos.', err);
    });
