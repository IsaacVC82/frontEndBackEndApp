
require("dotenv").config();
const express = require("express");
const cors = require("cors"); 


const { connectDB } = require("./config/db");

const app = express();


const allowedOrigins = ['https://limegreen-gorilla-284669.hostingersite.com/create-todo']; 
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Conexión a la base de datos
connectDB(); // Esta función conecta a MySQL

// Rutas
const todo = require("./routes/todo");

// Inicializa middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Server up and running"));

// Utiliza las rutas
app.use("/api/todo", todo);

// Puerto de la aplicación
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

