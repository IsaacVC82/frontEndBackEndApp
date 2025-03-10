const express = require('express');
const Todo = require('../models/todo');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Obtener todos los TODOs (con paginación)
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const todos = await Todo.find()
            .skip((page - 1) * limit)
            .limit(Number(limit));
        res.status(200).json(todos);
    } catch (err) {
        console.error('Error al obtener TODOs:', err);
        res.status(500).json({ message: 'Error al obtener TODOs' });
    }
});

// Obtener un TODO específico por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);  // Buscar la tarea por ID
        if (!todo) {
            return res.status(404).json({ message: 'TODO no encontrado' });
        }
        res.status(200).json(todo);  // Devolver la tarea encontrada
    } catch (err) {
        console.error('Error al obtener TODO:', err);
        res.status(500).json({ message: 'Error al obtener TODO' });
    }
});

// Crear un nuevo TODO
router.post('/', async (req, res) => {
    try {
        const { title, description, date, priority, done } = req.body;
        const token = req.headers.authorization?.split(' ')[1]; // Obtener el token del header
        if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

        // Decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;  // Obtener el userId del token decodificado

        // Validación de campos
        if (!title || !description) {
            return res.status(400).json({ message: 'El título y la descripción son obligatorios' });
        }

        const newTodo = new Todo({ title, description, date, priority, done, userId });
        await newTodo.save();
        res.status(201).json(newTodo);  // Devolver el TODO creado
    } catch (err) {
        console.error('Error al crear TODO:', err);
        res.status(500).json({ message: 'Error al crear TODO' });
    }
});

// Actualizar un TODO
router.put('/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Devuelve el documento actualizado
        );
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar un TODO
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({ message: 'TODO no encontrado' });
        }

        res.status(200).json({ message: 'TODO eliminado exitosamente', todo });
    } catch (err) {
        console.error('Error al eliminar TODO:', err);
        res.status(500).json({ message: 'Error al eliminar TODO' });
    }
});

module.exports = router;

// Crear un nuevo TODO
router.post('/', async (req, res) => {
    try {
        const { title, description, date, priority, done } = req.body;

        // Validación de campos
        if (!title || !description) {
            return res.status(400).json({ message: 'El título y la descripción son obligatorios' });
        }

        const newTodo = new Todo({ title, description, date, priority, done });
        await newTodo.save();
        res.status(201).json(newTodo);  // Devolver el TODO creado
    } catch (err) {
        console.error('Error al crear TODO:', err);
        res.status(500).json({ message: 'Error al crear TODO' });
    }
});

// Actualizar un TODO
router.put('/:id', async (req, res) => {
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // Devuelve el documento actualizado
      );
      res.json(updatedTodo);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// Eliminar un TODO
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({ message: 'TODO no encontrado' });
        }

        res.status(200).json({ message: 'TODO eliminado exitosamente', todo });
    } catch (err) {
        console.error('Error al eliminar TODO:', err);
        res.status(500).json({ message: 'Error al eliminar TODO' });
    }
});

module.exports = router;
