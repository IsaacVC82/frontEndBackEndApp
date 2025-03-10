const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

// Obtener las tareas del usuario según el userId enviado desde el frontend
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const todos = await Todo.find({ userId });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener las tareas" });
  }
});

// Crear una nueva tarea asociada al userId enviado desde el frontend
router.post("/", async (req, res) => {
  const { title, description, date, priority, done, userId } = req.body;

  if (!title || !userId) {
    return res.status(400).json({ message: "El título y el userId son obligatorios" });
  }

  const todo = new Todo({
    title,
    description,
    date,
    priority,
    done,
    userId,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: "Error al crear la tarea" });
  }
});

// Actualizar una tarea del usuario
router.put("/:id", async (req, res) => {
  const { userId, ...updateData } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "userId requerido" });
  }

  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId });

    if (!todo) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    Object.assign(todo, updateData);
    await todo.save();

    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: "Error al actualizar la tarea" });
  }
});

// Eliminar una tarea del usuario
router.delete("/:id", async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "userId requerido" });
  }

  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId });

    if (!todo) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.json({ message: "Tarea eliminada" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar la tarea" });
  }
});

module.exports = router;
