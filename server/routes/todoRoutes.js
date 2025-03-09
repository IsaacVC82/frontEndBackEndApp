const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// Simulando un `userId` en las rutas, lo tomamos del cuerpo de la solicitud
router.use((req, res, next) => {
  const userId = req.headers['user-id']; // Asumimos que el `userId` viene en los encabezados de la solicitud
  if (!userId) {
    return res.status(400).json({ message: 'userId requerido' });
  }
  req.userId = userId; // Guardamos el `userId` en la solicitud
  next();
});

// Obtener todas las tareas (filtradas por `userId`)
router.get('/api/todo', async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener las tareas" });
  }
});

// Crear una nueva tarea (asociada a un `userId`)
router.post('/api/todo', async (req, res) => {
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
    userId: req.userId, // Asocia la tarea con el `userId`
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: "Error al crear la tarea" });
  }
});

// Actualizar una tarea por ID (solo si pertenece al `userId`)
router.put('/api/todo/:id', async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.userId }); // Filtra por `userId`

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

// Eliminar una tarea por ID (solo si pertenece al `userId`)
router.delete('/api/todo/:id', async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.userId }); // Filtra por `userId`

    if (!todo) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.json({ message: "Tarea eliminada" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar la tarea" });
  }
});

module.exports = router;




