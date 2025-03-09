import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "https://frontendbackendapp.onrender.com";

const ShowTodoList = () => {
  const [todos, setTodos] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/api/todo`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => setTodos(response.data))
    .catch(error => console.error("Error al cargar tareas:", error));
  }, [token]);

  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/todo/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error al borrar la tarea:", error.message);
    }
  };

  return (
    <div className="todo-list-container">
      <h2>Lista de Tareas</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            <div>
              <strong>Título:</strong> {todo.title}
            </div>
            <div>
              <strong>Descripción:</strong> {todo.description}
            </div>
            <div>
              <strong>Fecha:</strong> {todo.date}
            </div>
            <div>
              <strong>Prioridad:</strong> {todo.priority}
            </div>
            <div>
              <strong>Completada:</strong> {todo.done ? 'Sí' : 'No'}
            </div>
            <button onClick={() => handleEdit(todo.id)}>Editar</button>
            <button onClick={() => handleDelete(todo.id)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowTodoList;



