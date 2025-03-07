const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: Date,
  priority: { type: String, enum: ["baja", "media", "alta"], default: "baja" },
  done: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Relación con usuario
}, {
  timestamps: true
});

module.exports = mongoose.model("Todo", todoSchema);

