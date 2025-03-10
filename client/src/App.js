import { useState, useEffect } from 'react';
import axios from 'axios';
import CreateTodo from './createTodo';

const API_URL = process.env.REACT_APP_API_URL || "https://frontendbackendapp.onrender.com";

const App = () => {
    const [todos, setTodos] = useState([]);
    const [username, setUsername] = useState("");  // Username del usuario

    useEffect(() => {
        if (username) {
            fetchTodos();
        }
    }, [username]);

    const fetchTodos = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/todos/${username}`);
            setTodos(response.data);
        } catch (err) {
            console.error("Error al cargar tareas:", err.response ? err.response.data : err.message);
        }
    };

    const handleAddTodo = (todo) => {
        setTodos([...todos, todo]);  // Agregar nueva tarea al estado
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);  // Cambiar el username
    };

    return (
        <div>
            <h1>Mis Tareas</h1>
            <input
                type="text"
                placeholder="Ingresa tu nombre de usuario"
                value={username}
                onChange={handleUsernameChange}
            />
            {username && (
                <div>
                    <CreateTodo handleAddTodo={handleAddTodo} />
                    <ul>
                        {todos.map((todo) => (
                            <li key={todo._id}>
                                <strong>{todo.title}</strong>
                                <p>{todo.description}</p>
                                <p>{todo.date}</p>
                                <p>{todo.priority}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default App;
