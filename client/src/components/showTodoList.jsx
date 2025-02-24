import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ShowTodoList({ todos, fetchTodos }) {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
  const navigate = useNavigate();

  // Función para eliminar una tarea
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/todo/${id}`);
      fetchTodos(); // Actualizar la lista de tareas después de eliminar
    } catch (err) {
      console.error("Error al eliminar la tarea:", err.message);
    }
  };

  // Función para redirigir a la página de edición
  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="app-container">
      <h2>Lista de Tareas</h2>
      {todos.length === 0 ? (
        <p>No hay tareas disponibles.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo._id} className="todo-item">
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
                <strong>Estado:</strong> {todo.done ? "Hecho" : "Pendiente"}
              </div>
              <div>
                <button onClick={() => handleEdit(todo._id)}>Editar</button>
                <button onClick={() => handleDelete(todo._id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShowTodoList;
