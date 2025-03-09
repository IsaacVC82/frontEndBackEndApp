const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Conectado a MongoDB"))
.catch((err) => console.error("Error de conexión a MongoDB:", err));

// Middlewares
app.use(cors({
  origin: [process.env.CLIENT_URL || "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

// Modelo de Tarea
const Todo = mongoose.model("Todo", new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  date: { type: Date, required: false },
  priority: { type: String, required: false },
  done: { type: Boolean, default: false },
  userId: { type: String, required: true }, // Este campo identifica al usuario
}));

// Rutas de tareas
const todoRoutes = require('./routes/todoRoutes');
app.use(todoRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


