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
  completed: { type: Boolean, default: false }
}));

// Rutas de tareas (sin autenticación)
app.get("/api/todo", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener tareas" });
  }
});

app.post("/api/todo", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "El título es obligatorio" });

    const newTodo = new Todo({ title });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: "Error al crear tarea" });
  }
});

app.put("/api/todo/:id", async (req, res) => {
  try {
    const { title, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, completed },
      { new: true }
    );

    if (!updatedTodo) return res.status(404).json({ message: "Tarea no encontrada" });

    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar tarea" });
  }
});

app.delete("/api/todo/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) return res.status(404).json({ message: "Tarea no encontrada" });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar tarea" });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

