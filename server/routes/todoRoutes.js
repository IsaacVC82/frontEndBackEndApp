const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

// Crear una nueva tarea
router.post("/", async (req, res) => {
  try {
    const { title, description, date, priority, done, username } = req.body;

    if (!title || !username) {
      return res.status(400).json({ message: "El título y el nombre de usuario son obligatorios" });
    }

    const newTodo = new Todo({ title, description, date, priority, done, username });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    console.error("Error al crear la tarea:", err);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Obtener todas las tareas de un usuario
router.get("/", async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ message: "El nombre de usuario es requerido" });
    }

    const todos = await Todo.find({ username });
    res.status(200).json(todos);
  } catch (err) {
    console.error("Error al obtener las tareas:", err);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Actualizar una tarea
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, priority, done, username } = req.body;

    if (!username) {
      return res.status(400).json({ message: "El nombre de usuario es obligatorio" });
    }

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, username }, // Asegurarse de que la tarea pertenece al usuario
      { title, description, date, priority, done },
      { new: true } // Para devolver la tarea actualizada
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Tarea no encontrada o no pertenece al usuario" });
    }

    res.status(200).json(updatedTodo);
  } catch (err) {
    console.error("Error al actualizar la tarea:", err);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Eliminar una tarea
router.delete("/:id", async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ message: "El nombre de usuario es obligatorio" });
    }

    const deletedTodo = await Todo.findOneAndDelete({ _id: req.params.id, username });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Tarea no encontrada o no pertenece al usuario" });
    }

    res.status(200).json({ message: "Tarea eliminada correctamente" });
  } catch (err) {
    console.error("Error al eliminar la tarea:", err);
    res.status(500).json({ message: "Error del servidor" });
  }
});

module.exports = router;






