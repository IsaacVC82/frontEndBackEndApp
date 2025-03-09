import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "https://frontendbackendapp.onrender.com";

const ShowTodoList = () => {
  const [todos, setTodos] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`${API_URL}/api/todo`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => setTodos(response.data))
    .catch(error => console.error("Error al cargar tareas:", error));
  }, [token]);

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};

export default ShowTodoList;

