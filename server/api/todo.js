const express = require('express');
const Todo = require('../models/todo');
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
        const { id } = req.params;
        const { title, description, date, priority, done } = req.body;

        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (date) updateData.date = date;
        if (priority) updateData.priority = priority;
        if (typeof done === 'boolean') updateData.done = done;

        const todo = await Todo.findByIdAndUpdate(id, updateData, { new: true });
        if (!todo) {
            return res.status(404).json({ message: 'TODO no encontrado' });
        }

        res.status(200).json({ message: 'TODO actualizado exitosamente', todo });
    } catch (err) {
        console.error('Error al actualizar TODO:', err);
        res.status(500).json({ message: 'Error al actualizar TODO' });
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
