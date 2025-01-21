require("dotenv").config();
const express = require("express");
const cors = require("cors"); 
const { connectDB } = require("./config/db"); 
const app = express();

// Conectar a la base de datos
connectDB();

app.use(cors({
    origin: 'https://tu-dominio-frontend.com', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
}));

// Middleware para analizar JSON
app.use(express.json({ extended: false }));

// Ruta raíz
app.get("/", (req, res) => res.send("Server up and running"));

// Rutas de la API
const todo = require("./routes/todo");
app.use("/api/todo", todo);

// Configuración del puerto
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
