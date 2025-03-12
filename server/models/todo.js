const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    date: { type: Date, required: false },
    priority: { type: String, required: false },
    done: { type: Boolean, default: false },
    username: { type: String, required: true },
    days: {
        type: [String],
        enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        default: []
    }
});

const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);

module.exports = Todo;







