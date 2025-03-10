const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Crear un nuevo TODO
router.post('/', async (req, res) => {
    try {
        const { title, description, date, priority, done, username } = req.body;

        if (!title || !description || !username) {
            return res.status(400).json({ message: 'El título, la descripción y el nombre de usuario son obligatorios' });
        }

        const newTodo = new Todo({
            title,
            description,
            date,
            priority,
            done,
            username  // Asociar la tarea al username
        });
        await newTodo.save();
        res.status(201).json(newTodo);  // Devolver el TODO creado
    } catch (err) {
        console.error('Error al crear TODO:', err);
        res.status(500).json({ message: 'Error al crear TODO' });
    }
});

// Obtener tareas de un usuario específico
router.get('/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const todos = await Todo.find({ username });
        
        if (!todos.length) {
            return res.status(404).json({ message: 'No se encontraron tareas para este usuario' });
        }

        res.json(todos);
    } catch (err) {
        console.error('Error al obtener tareas:', err);
        res.status(500).json({ message: 'Error al obtener tareas' });
    }
});

module.exports = router;
