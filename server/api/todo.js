const mongoose = require('mongoose');

// Conexión a la base de datos 
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexión a MongoDB Atlas exitosa');
    } catch (err) {
        console.error('Error al conectar con MongoDB:', err);
        process.exit(1); // Detener la aplicación si no se puede conectar
    }
};

// Modelo de datos
const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    done: { type: Boolean, default: false },
});

const Todo = mongoose.model('Todo', todoSchema);

// Handler de la API
module.exports = async function handler(req, res) {
    await connectDB(); 

    if (req.method === 'GET') {
        try {
            const todos = await Todo.find();
            res.status(200).json(todos);
        } catch (err) {
            console.error('Error al obtener TODOs:', err);
            res.status(500).json({ message: 'Error al obtener TODOs' });
        }
    } else if (req.method === 'POST') {
        try {
            const { title, description, date, priority, done } = req.body;
            const newTodo = new Todo({ title, description, date, priority, done });
            await newTodo.save();
            res.status(201).json({ message: 'TODO creado exitosamente' });
        } catch (err) {
            console.error('Error al crear TODO:', err);
            res.status(500).json({ message: 'Error al crear TODO' });
        }
    } else if (req.method === 'PUT') {
        try {
            const { id } = req.query;
            const { title, description, date, priority, done } = req.body;
            await Todo.findByIdAndUpdate(id, { title, description, date, priority, done });
            res.status(200).json({ message: 'TODO actualizado exitosamente' });
        } catch (err) {
            console.error('Error al actualizar TODO:', err);
            res.status(500).json({ message: 'Error al actualizar TODO' });
        }
    } else if (req.method === 'DELETE') {
        try {
            const { id } = req.query;
            await Todo.findByIdAndDelete(id);
            res.status(200).json({ message: 'TODO eliminado exitosamente' });
        } catch (err) {
            console.error('Error al eliminar TODO:', err);
            res.status(500).json({ message: 'Error al eliminar TODO' });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
};

