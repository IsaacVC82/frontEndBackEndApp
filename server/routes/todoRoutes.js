const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

router.post('/', async (req, res) => {
  try {
    const { title, description, date, priority, done, username } = req.body;

    if (!title || !username) {
      return res.status(400).json({ message: 'El título y el nombre de usuario son obligatorios' });
    }

    const newTodo = new Todo({ title, description, date, priority, done, username });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    console.error('Error al crear la tarea:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { username } = req.query;
    const todos = await Todo.find({ username });
    res.status(200).json(todos);
  } catch (err) {
    console.error('Error al obtener las tareas:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Tarea eliminada correctamente' });
  } catch (err) {
    console.error('Error al eliminar la tarea:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;





