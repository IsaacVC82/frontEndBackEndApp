import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "https://frontendbackendapp.onrender.com";

const ShowTodoList = ({ username }) => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/api/todos?username=${username}`)
      .then(response => setTodos(response.data))
      .catch(error => console.error("Error al cargar tareas:", error));
  }, [username]);

  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error("Error al borrar la tarea:", error.message);
    }
  };

  return (
    <div>
      <h2>Lista de Tareas de {username}</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <p>Título: {todo.title}</p>
            <p>Descripción: {todo.description}</p>
            <p>Fecha: {todo.date}</p>
            <p>Prioridad: {todo.priority}</p>
            <p>Completada: {todo.done ? "Sí" : "No"}</p>
            <button onClick={() => handleEdit(todo._id)}>Editar</button>
            <button onClick={() => handleDelete(todo._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowTodoList;



