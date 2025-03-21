
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/holidays', async (req, res) => {
  const country = req.query.country;
  const year = req.query.year;
  const apiKey = process.env.CALENDARIFIC_API_KEY;  

  try {
    const response = await fetch(`https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${country}&year=${year}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching holidays:", error);
    res.status(500).json({ message: "Error al obtener los días festivos" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
