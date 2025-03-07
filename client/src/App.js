import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ShowTodoList from "./components/showTodoList";
import CreateTodo from "./components/createTodo";
import UpdateTodo from "./components/updateTodo";
import "./App.scss";

function App() {
  const [todos, setTodos] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

  // Función para cargar las tareas desde el backend
  const fetchTodos = () => {
    axios
      .get(`${API_URL}/api/todo`)
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("Error al cargar tareas:", err.message));
  };

  // Cargar las tareas al iniciar la aplicación
  useEffect(() => {
    fetchTodos();
  }, []);

  // Función para agregar una nueva tarea
  const handleAddTodo = (newTodo) => {
    axios
      .post(`${API_URL}/api/todo`, newTodo)
      .then(() => fetchTodos())
      .catch((err) => console.error("Error al crear la tarea:", err.message));
  };

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Crear Tarea</Link></li>
          <li><Link to="/show">Ver Lista de Tareas</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<CreateTodo handleAddTodo={handleAddTodo} />} />
        <Route path="/show" element={<ShowTodoList todos={todos} fetchTodos={fetchTodos} />} />
        <Route path="/update/:id" element={<UpdateTodo fetchTodos={fetchTodos} />} />
      </Routes>
    </Router>
  );
}

export default App;