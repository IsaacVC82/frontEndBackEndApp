import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

function ShowTodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get(`${API_URL}/api/todo`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => setTodos(response.data))
    .catch(error => console.error("Error al cargar las tareas:", error));
  }, []);

  return (
    <div className="app-container">
      <h2>Lista de Tareas</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title} - {todo.done ? "Hecho" : "Pendiente"}</li>
        ))}
      </ul>
    </div>
  );
}

export default ShowTodoList;
