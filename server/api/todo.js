const express = require('express');
const app = express();
const PORT = 8000;

// Middleware para analizar JSON
app.use(express.json());

// Ruta API de ejemplo
app.get('/api/todo', (req, res) => {
  res.json({ todos: [] }); // Devuelve una lista vacía de tareas por ahora
});

// Ruta para crear un TODO
app.post('/api/todo', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'El título es obligatorio' });
  }
  res.status(201).json({ message: 'TODO creado', todo: { title } });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
axios.get('http://localhost:8000/api/todo')
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error('Error al obtener TODOs:', error.message);
  });
  axios.post('http://localhost:8000/api/todo', { title: 'Nuevo TODO' })
  .then((response) => {
    console.log('TODO creado:', response.data);
  })
  .catch((error) => {
    console.error('Error al crear TODO:', error.message);
  });
