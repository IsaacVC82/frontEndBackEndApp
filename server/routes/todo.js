const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

// Simula un usuario autenticado con un `userId` fijo (esto puede ser modificado según el frontend)
const userId = "user1"; 

// Obtener las tareas del usuario
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({ userId: userId }); // Filtra por el `userId`
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener las tareas" });
  }
});

// Crear una nueva tarea asociada al usuario
router.post("/", async (req, res) => {
  const { title, description, date, priority, done } = req.body;

  if (!title) {
    return res.status(400).json({ message: "El título es obligatorio" });
  }

  const todo = new Todo({
    title,
    description,
    date,
    priority,
    done,
    userId: userId, // Asocia la tarea con el `userId` del usuario
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
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: userId }); // Filtra por `userId`

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

// Eliminar una tarea del usuario
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: userId }); // Filtra por `userId`

    if (!todo) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.json({ message: "Tarea eliminada" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar la tarea" });
  }
});

module.exports = router;

