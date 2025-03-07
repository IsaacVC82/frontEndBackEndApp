const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");
const authMiddleware = require("../middleware/authMiddleware");

// Obtener las tareas del usuario autenticado
router.get("/", authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener las tareas" });
  }
});

// Crear una nueva tarea asociada al usuario autenticado
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, date, priority, done } = req.body;

  const todo = new Todo({
    title,
    description,
    date,
    priority,
    done,
    userId: req.user.id,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: "Error al crear la tarea" });
  }
});

// Actualizar una tarea del usuario autenticado
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.user.id });

    if (!todo) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    Object.assign(todo, req.body);
    await todo.save();

    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: "Error al actualizar la tarea" });
  }
});

// Eliminar una tarea del usuario autenticado
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!todo) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.json({ message: "Tarea eliminada" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar la tarea" });
  }
});

module.exports = router;
