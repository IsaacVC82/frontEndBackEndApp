const { connectDB } = require("../config/db");

export default async function handler(req, res) {
  // Conecta a la base de datos
  const db = await connectDB();

  try {
    if (req.method === "GET") {
      // Obtener todos los todos
      const [todos] = await db.query("SELECT * FROM todos");
      return res.status(200).json(todos);
    } else if (req.method === "POST") {
      const { title, description, date, priority, done } = req.body;

      // Validación de los datos recibidos
      if (!title || !description) {
        return res.status(400).json({ message: "Título y descripción son obligatorios" });
      }

      const validPriority = ["Low", "Medium", "High"];
      if (priority && !validPriority.includes(priority)) {
        return res.status(400).json({ message: "Prioridad no válida" });
      }

      const isDone = done ? 1 : 0; 

      // Insertar en la base de datos
      await db.query(
        "INSERT INTO todos (title, description, date, priority, done) VALUES (?, ?, ?, ?, ?)",
        [title, description, date || null, priority || "Low", isDone]
      );
      return res.status(201).json({ message: "Todo creado" });
    } else if (req.method === "PUT") {
      const { id, title, description, date, priority, done } = req.body;

      if (!id) {
        return res.status(400).json({ message: "ID es obligatorio" });
      }

      const validPriority = ["Low", "Medium", "High"];
      if (priority && !validPriority.includes(priority)) {
        return res.status(400).json({ message: "Prioridad no válida" });
      }
      const isDone = done ? 1 : 0;

      // Actualizar la tarea en la base de datos
      await db.query(
        "UPDATE todos SET title = ?, description = ?, date = ?, priority = ?, done = ? WHERE id = ?",
        [title, description, date || null, priority || "Low", isDone, id]
      );
      return res.status(200).json({ message: "Todo actualizado" });
    } else if (req.method === "DELETE") {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ message: "ID es obligatorio" });
      }

      await db.query("DELETE FROM todos WHERE id = ?", [id]);
      return res.status(200).json({ message: "Todo eliminado" });
    } else {
      return res.status(405).json({ message: "Método no permitido" });
    }
  } catch (error) {
    console.error("Error en la API:", error.message);
    return res.status(500).json({ message: "Error en el servidor" });
  }
}
