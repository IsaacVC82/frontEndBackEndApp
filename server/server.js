const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8000;

// Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch((err) => console.error('Error al conectar con la base de datos:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de CORS
const corsOptions = {
    origin: ['https://back-end-front-end-app.vercel.app'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
    credentials: true, // Permitir cookies/sesiones
};

app.use(cors(corsOptions));

// Definición del modelo
const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    done: { type: Boolean, default: false },
});

const Todo = mongoose.model('Todo', todoSchema);

// Rutas
app.get('/api/todo', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        console.error('Error al obtener TODOs:', err);
        res.status(500).json({ message: 'Error al obtener TODOs' });
    }
});

app.post('/api/todo', async (req, res) => {
    try {
        const { title, description, date, priority, done } = req.body;
        const newTodo = new Todo({ title, description, date, priority, done });
        await newTodo.save();
        res.status(201).json({ message: 'TODO creado exitosamente' });
    } catch (err) {
        console.error('Error al crear TODO:', err);
        res.status(500).json({ message: 'Error al crear TODO' });
    }
});

app.put('/api/todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, priority, done } = req.body;
        await Todo.findByIdAndUpdate(id, { title, description, date, priority, done });
        res.status(200).json({ message: 'TODO actualizado exitosamente' });
    } catch (err) {
        console.error('Error al actualizar TODO:', err);
        res.status(500).json({ message: 'Error al actualizar TODO' });
    }
});

app.delete('/api/todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Todo.findByIdAndDelete(id);
        res.status(200).json({ message: 'TODO eliminado exitosamente' });
    } catch (err) {
        console.error('Error al eliminar TODO:', err);
        res.status(500).json({ message: 'Error al eliminar TODO' });
    }
});

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
