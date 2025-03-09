import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "user1");

  // Obtener tareas al cargar la aplicación
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/todo", {
        headers: {
          "user-id": userId, // Enviar `userId` en los encabezados
        },
      })
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Error al obtener tareas:", error));
  }, [userId]);

  // Manejar la creación de una nueva tarea
  const handleAddTask = () => {
    axios
      .post(
        "http://localhost:8000/api/todo",
        { title: newTask },
        {
          headers: {
            "user-id": userId, // Enviar `userId` en los encabezados
          },
        }
      )
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTask("");
      })
      .catch((error) => console.error("Error al agregar tarea:", error));
  };

  return (
    <div>
      <h1>Mis Tareas</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Agregar nueva tarea"
        />
        <button onClick={handleAddTask}>Agregar tarea</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.title} <button>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
