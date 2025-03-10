const Todo = require("../models/todo");

exports.getAllTodo = (req, res) => {
    const { username } = req.params;
    Todo.find({ username })
        .then((todos) => res.json(todos))
        .catch((err) =>
            res.status(500).json({ message: "Error fetching todos", error: err.message })
        );
};

exports.postCreateTodo = (req, res) => {
    const { title, description, date, priority, done, username } = req.body;
    if (!title || !username) {
        return res.status(400).json({ message: "El título y el username son obligatorios" });
    }
    const newTodo = new Todo({
        title, description, date, priority, done, username
    });

    newTodo.save()
        .then(() => res.status(201).json({ message: 'TODO creado exitosamente' }))
        .catch((err) =>
            res.status(400).json({ message: "Failed to create todo", error: err.message })
        );
};

exports.putUpdateTodo = (req, res) => {
    const { id } = req.params;
    const { title, description, date, priority, done, username } = req.body;

    Todo.findOneAndUpdate({ _id: id, username }, { title, description, date, priority, done })
        .then(() => res.status(200).json({ message: 'TODO actualizado exitosamente' }))
        .catch((err) =>
            res.status(400).json({ message: "Failed to update todo", error: err.message })
        );
};

exports.deleteTodo = (req, res) => {
    const { id } = req.params;
    const { username } = req.body;

    Todo.findOneAndDelete({ _id: id, username })
        .then(() => res.status(200).json({ message: 'TODO eliminado exitosamente' }))
        .catch((err) =>
            res.status(404).json({ message: "Todo not found", error: err.message })
        );
};
