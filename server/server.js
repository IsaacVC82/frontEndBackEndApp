const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Configuración de la aplicación
const app = express();
const PORT = process.env.PORT || 8000;

// Conexión a la base de datos
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexión a MongoDB exitosa');
    } catch (err) {
        console.error('Error al conectar con MongoDB:', err);
        process.exit(1); // Detener la aplicación si no se puede conectar
    }
};

const corsOptions = {
    origin: 'https://back-end-front-end-app-g621.vercel.app',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions)); 

// Middleware para procesar el cuerpo de las solicitudes
app.use(express.json());

// Modelo de datos
const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    done: { type: Boolean, default: false },
});

const Todo = mongoose.model('Todo', todoSchema);

// Rutas de la API
app.get('/api/todo', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
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

// Inicializar la conexión a la base de datos y arrancar el servidor
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
});
