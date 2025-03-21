const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Conectado a MongoDB"))
.catch((err) => console.error("Error de conexión:", err));

app.use(cors({
  origin: [process.env.CLIENT_URL || "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const todoRoutes = require('./routes/todoRoutes');
app.use('/api/todos', todoRoutes);

// Endpoint para obtener los días festivos
app.get('/api/holidays', async (req, res) => {
  const { country, year } = req.query;
  if (!country || !year) {
    return res.status(400).json({ message: "Se requieren el país y el año" });
  }

  try {
    const response = await axios.get(`https://calendarific.com/api/v2/holidays`, {
      params: {
        api_key: process.env.CALENDARIFIC_API_KEY,  
        country,
        year
      }
    });

    const holidays = response.data.response.holidays;
    res.status(200).json(holidays);
  } catch (error) {
    console.error("Error al obtener los días festivos:", error);
    res.status(500).json({ message: "Error al obtener los días festivos", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


