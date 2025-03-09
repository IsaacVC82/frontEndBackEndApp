import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ShowTodoList({ todos, fetchTodos }) {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/todo/${id}`);
      fetchTodos();
    } catch (err) {
      console.error("Error al eliminar la tarea:", err.message);
    }
  };

  return (
    <div className="app-container">
      <h2>Lista de Tareas</h2>
      {todos.length === 0 ? <p>No hay tareas disponibles.</p> : (
        <ul>
          {todos.map((todo) => (
            <li key={todo._id} className="todo-item">
              <div><strong>Título:</strong> {todo.title}</div>
              <div><strong>Descripción:</strong> {todo.description}</div>
              <div><strong>Fecha:</strong> {todo.date}</div>
              <div><strong>Prioridad:</strong> {todo.priority}</div>
              <div><strong>Estado:</strong> {todo.done ? "Hecho" : "Pendiente"}</div>
              <button onClick={() => navigate(`/update/${todo._id}`)}>Editar</button>
              <button onClick={() => handleDelete(todo._id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShowTodoList;
