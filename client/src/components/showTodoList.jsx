import React from "react";
import { Link } from "react-router-dom";

function ShowTodoList({ todos }) {
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
              <div><Link to={`/update/${todo._id}`}>Editar</Link></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShowTodoList;


