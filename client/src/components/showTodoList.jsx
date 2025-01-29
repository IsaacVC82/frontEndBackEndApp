import React from "react";

const ShowTodoList = ({ todos }) => {
  if (!Array.isArray(todos) || todos.length === 0) {
    return <h2>No hay tareas disponibles</h2>;
  }

  return (
    <div>
      <h2>Lista de Tareas</h2>
      <ul>
        {todos.map((todo, index) => {
          if (!todo || typeof todo !== "object") {
            return <li key={index}>Tarea inválida</li>;
          }

          return (
            <li key={todo._id || index}>
              <strong>{todo.title ?? "Sin título"}</strong>:{" "}
              {todo.description ?? "Sin descripción"}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ShowTodoList;

