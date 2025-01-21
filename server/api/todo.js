const { connectDB } = require("../config/db");

// Función para manejar las solicitudes
export default async function handler(req, res) {
  // Conecta a la base de datos
  const db = await connectDB();

  // Manejo de métodos
  if (req.method === "GET") {
    const todos = await db.query("SELECT * FROM todos");
    return res.status(200).json(todos);
  } else if (req.method === "POST") {
    const { title, description } = req.body;
    await db.query("INSERT INTO todos (title, description) VALUES (?, ?)", [
      title,
      description,
    ]);
    return res.status(201).json({ message: "Todo creado" });
  } else {
    return res.status(405).json({ message: "Método no permitido" });
  }
}
