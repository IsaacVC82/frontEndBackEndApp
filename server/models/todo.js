const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    date: { type: Date, required: false },
    priority: { type: String, required: false },
    done: { type: Boolean, default: false },
    username: { type: String, required: true },
});

const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);

module.exports = Todo;






