const mongoose = require('mongoose');

// Conexión a la base de datos 
const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Conexión a MongoDB Atlas exitosa');
        }
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

    try {
        if (req.method === 'GET') {
            const todos = await Todo.find();
            res.status(200).json(todos);
        } else if (req.method === 'POST') {
            const { title, description, date, priority, done } = req.body;

            if (!title || !description) {
                return res.status(400).json({ message: 'Todos los campos requeridos deben ser completados.' });
            }

            const newTodo = new Todo({ title, description, date, priority, done });
            await newTodo.save();
            res.status(201).json({ message: 'TODO creado exitosamente' });
        } else if (req.method === 'PUT') {
            const { id } = req.query;
            const { title, description, date, priority, done } = req.body;

            if (!id) {
                return res.status(400).json({ message: 'El ID es requerido para actualizar.' });
            }

            await Todo.findByIdAndUpdate(id, { title, description, date, priority, done });
            res.status(200).json({ message: 'TODO actualizado exitosamente' });
        } else if (req.method === 'DELETE') {
            const { id } = req.query;

            if (!id) {
                return res.status(400).json({ message: 'El ID es requerido para eliminar.' });
            }

            await Todo.findByIdAndDelete(id);
            res.status(200).json({ message: 'TODO eliminado exitosamente' });
        } else {
            res.status(405).json({ message: 'Método no permitido' });
        }
    } catch (err) {
        console.error(`Error al procesar la solicitud (${req.method}):`, err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
