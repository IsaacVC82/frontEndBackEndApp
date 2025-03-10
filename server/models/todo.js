const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    priority: { type: String, required: true },
    done: { type: Boolean, required: true },
    username: { type: String, required: true }  // Asociar tarea al username
});

module.exports = mongoose.model('Todo', TodoSchema);






