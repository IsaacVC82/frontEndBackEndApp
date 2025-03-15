const Todo = require("../models/todo");

// Obtener todos los TODOs de un usuario
exports.getAllTodo = async (req, res) => {
    try {
        const { username } = req.params;
        if (!username) {
            return res.status(400).json({ message: "El username es obligatorio" });
        }
        const todos = await Todo.find({ username });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener los TODOs", error: err.message });
    }
};

// Crear un nuevo TODO
exports.postCreateTodo = async (req, res) => {
    try {
        const { title, description, date, priority, done, username } = req.body;
        if (!title || !username) {
            return res.status(400).json({ message: "El título y el username son obligatorios" });
        }
        const newTodo = new Todo({ title, description, date, priority, done, username });
        await newTodo.save();
        res.status(201).json({ message: "TODO creado exitosamente", todo: newTodo });
    } catch (err) {
        res.status(400).json({ message: "Error al crear el TODO", error: err.message });
    }
};

// Actualizar un TODO existente
exports.putUpdateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, priority, done, username } = req.body;
        if (!id || !username) {
            return res.status(400).json({ message: "El id y el username son obligatorios" });
        }
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: id, username },
            { title, description, date, priority, done },
            { new: true }
        );
        if (!updatedTodo) {
            return res.status(404).json({ message: "TODO no encontrado" });
        }
        res.status(200).json({ message: "TODO actualizado exitosamente", todo: updatedTodo });
    } catch (err) {
        res.status(400).json({ message: "Error al actualizar el TODO", error: err.message });
    }
};

// Eliminar un TODO
exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { username } = req.body;
        if (!id || !username) {
            return res.status(400).json({ message: "El id y el username son obligatorios" });
        }
        const deletedTodo = await Todo.findOneAndDelete({ _id: id, username });
        if (!deletedTodo) {
            return res.status(404).json({ message: "TODO no encontrado" });
        }
        res.status(200).json({ message: "TODO eliminado exitosamente" });
    } catch (err) {
        res.status(400).json({ message: "Error al eliminar el TODO", error: err.message });
    }
};

