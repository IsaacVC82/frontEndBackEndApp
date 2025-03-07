const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Conectado a MongoDB"))
.catch((err) => console.error("Error de conexión a MongoDB:", err));

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
