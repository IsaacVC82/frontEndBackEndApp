const Todo = require("../models/todo");

exports.getAllTodo = (req, res) => {
    Todo.find()
        .then((todos) => res.json(todos))
        .catch((err) =>
            res.status(500).json({ message: "Error fetching todos", error: err.message })
        );
};

exports.postCreateTodo = (req, res) => {
    const { title, description, date, priority, done } = req.body;
    const newTodo = new Todo({
        title, description, date, priority, done
    });

    newTodo.save()
        .then(() => res.status(201).json({ message: 'TODO creado exitosamente' }))
        .catch((err) =>
            res.status(400).json({ message: "Failed to create todo", error: err.message })
        );
};

exports.putUpdateTodo = (req, res) => {
    const { id } = req.params;
    const { title, description, date, priority, done } = req.body;

    Todo.findByIdAndUpdate(id, { title, description, date, priority, done })
        .then(() => res.status(200).json({ message: 'TODO actualizado exitosamente' }))
        .catch((err) =>
            res.status(400).json({ message: "Failed to update todo", error: err.message })
        );
};

exports.deleteTodo = (req, res) => {
    const { id } = req.params;

    Todo.findByIdAndDelete(id)
        .then(() => res.status(200).json({ message: 'TODO eliminado exitosamente' }))
        .catch((err) =>
            res.status(404).json({ message: "Todo not found", error: err.message })
        );
};

