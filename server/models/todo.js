const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
  },
  date: {
    type: Date,
    required: [true, 'La fecha es obligatoria'],
  },
  priority: {
    type: String,
    enum: ['Baja', 'Media', 'Alta'], // Opciones válidas
    required: [true, 'La prioridad es obligatoria'],
  },
  done: {
    type: Boolean,
    default: false,
    required: false,
  },
});

module.exports = mongoose.model('Todo', todoSchema);
