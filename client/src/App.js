import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ShowTodoList from "./components/showTodoList";
import CreateTodo from "./components/createTodo";
import UpdateTodo from "./components/updateTodo";
import "./App.scss";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/todos`) 
      .then((res) => {
        console.log("Tareas recibidas en App.js:", res.data); 
        setTodos(Array.isArray(res.data) ? res.data : []); 
      })
      .catch((err) => {
        console.error("Error al cargar tareas:", err.message);
      });
  }, []);

  const handleAddTodo = (newTodo) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/todos`, newTodo) 
      .then((res) => {
        console.log("Nueva tarea agregada:", res.data);
        fetchTodos(); 
      })
      .catch((err) => {
        console.error("Error al crear la tarea:", err.message);
      });
  };

  const fetchTodos = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/todos`) 
      .then((res) => {
        console.log("Lista de tareas actualizada:", res.data);
        setTodos(res.data);
      })
      .catch((err) => {
        console.error("Error al cargar tareas:", err.message);
      });
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
  <Route path="/show" element={<ShowTodoList todos={todos} />} />
  <Route path="/update/:id" element={<UpdateTodo />} />  
</Routes>

    </Router>
  );
}

export default App;
