require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { connectDB } = require("./config/db");

const app = express();

app.use(cors({
  origin: "https://", 
  credentials: true, 
}));

// Rutas
const todo = require("./routes/todo");

// Conectar a la base de datos
connectDB(); // Conecta a MySQL

// Middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Server up and running"));

// Usar rutas
app.use("/api/todo", todo);

// Establecer puerto
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

