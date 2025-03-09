const mongoose = require("mongoose");

// Verifica si el modelo ya está definido antes de crearlo
const Todo = mongoose.models.Todo || mongoose.model('Todo', new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  date: { type: Date, required: false },
  priority: { type: String, required: false },
  done: { type: Boolean, default: false },
  userId: { type: String, required: true }, // Este campo identifica al usuario
}));

module.exports = Todo;




