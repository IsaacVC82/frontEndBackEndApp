const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet"); // Para la política de seguridad de contenido
const path = require("path");

dotenv.config();
const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"], // Permite cargar recursos desde el mismo dominio
      imgSrc: ["'self'", "https://frontendbackendapp.onrender.com"], // Permite cargar imágenes de mi dominio
      scriptSrc: ["'self'"], // Permite cargar scripts solo desde el mismo dominio
      styleSrc: ["'self'"], // Permite cargar estilos solo desde el mismo dominio
      connectSrc: ["'self'"], // Permite conexiones solo desde el mismo dominio
      fontSrc: ["'self'"], // Permite cargar fuentes desde el mismo dominio
      objectSrc: ["'none'"], // Bloquea la carga de objetos
      upgradeInsecureRequests: [], // Reemplaza HTTP por HTTPS cuando sea necesario
    }
  }
}));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error);
  }
};

connectDB();

// Definir las rutas
app.use("/api/todos", require("./routes/todoRoutes"));

// Configurar el servidor para servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Ruta principal
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Todo App");
});

// Definir puerto y servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
