import { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "https://frontendbackendapp.onrender.com";

const CreateTodo = ({ handleAddTodo }) => {
    const [data, setData] = useState({
        title: "",
        description: "",
        date: "",
        priority: "Baja",
        done: false
    });
    const [username, setUsername] = useState("");  // Username del usuario

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);  // Cambiar el username
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar si el username no está vacío
        if (!username) {
            alert('Por favor ingresa tu nombre de usuario.');
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/api/todos`, { ...data, username });  // Asegúrate de enviar username
            console.log("Respuesta del servidor:", response.data);
            handleAddTodo(response.data);
            setData({ title: "", description: "", date: "", priority: "Baja", done: false });
        } catch (err) {
            console.error("Error al crear la tarea:", err.response ? err.response.data : err.message);
        }
    };

    return (
        <div>
            <h3>Crear una nueva tarea</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Ingresa tu nombre de usuario" 
                    value={username} 
                    onChange={handleUsernameChange} 
                />
                <input
                    type="text"
                    name="title"
                    placeholder="Título de la tarea"
                    value={data.title}
                    onChange={handleChange}
                />
                <textarea
                    name="description"
                    placeholder="Descripción de la tarea"
                    value={data.description}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="date"
                    value={data.date}
                    onChange={handleChange}
                />
                <select name="priority" value={data.priority} onChange={handleChange}>
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                </select>
                <button type="submit">Crear tarea</button>
            </form>
        </div>
    );
};

export default CreateTodo;

