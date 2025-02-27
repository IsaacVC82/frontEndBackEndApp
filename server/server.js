const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Conectado a MongoDB"))
.catch(err => console.error("Error de conexión a MongoDB:", err));

// Rutas de la API
const todoRoutes = require("./routes/todo");
app.use("/api/todo", todoRoutes);

// Sirve los archivos estáticos del frontend
const clientBuildPath = path.join(__dirname, "client/build");
app.use(express.static(clientBuildPath));

// Ruta para manejar las demás solicitudes y servir el frontend
app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
