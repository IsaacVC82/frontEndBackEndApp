const express = require('express');
const router = express.Router();

let todos = [
  { id: 1, title: 'Primera tarea' },
  { id: 2, title: 'Segunda tarea' }
];

// Obtener todas las tareas (sin autenticación)
router.get('/api/todo', (req, res) => {
  res.json(todos);
});

// Crear una nueva tarea (sin autenticación)
router.post('/api/todo', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "El título es obligatorio" });
  }

  const newTodo = { id: todos.length + 1, title };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Actualizar una tarea por ID
router.put('/api/todo/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const todo = todos.find(todo => todo.id == id);
  if (!todo) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }

  todo.title = title || todo.title;
  res.json(todo);
});

// Eliminar una tarea por ID
router.delete('/api/todo/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id != id);
  res.status(204).send();
});

module.exports = router;


