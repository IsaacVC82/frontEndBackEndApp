import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ShowTodoList from './components/showTodoList'; 
import  CreateTodo  from './components/createTodo'; 
import UpdateTodo from './components/updateTodo'; 
import './App.scss'; 

function App() {
  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}todo`)
      .then((res) => {
        console.log("Tareas recibidas en App.js:", res.data); // Verifica que llegan correctamente
        setTodos(res.data);
      })
      .catch((err) => {
        console.error("Error al cargar tareas:", err.message);
      });
  }, []);
  

  // Maneja la adición de una nueva tarea
  const handleAddTodo = (newTodo) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}todo`, newTodo)
      .then((res) => {
        console.log('Respuesta del servidor:', res.data);
        setTodos((prevTodos) => [...prevTodos, res.data.todo]); // Agrega la tarea nueva
      })
      .catch((err) => {
        console.error("Error al crear la tarea:", err.message);
      });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateTodo handleAddTodo={handleAddTodo} />} />
        <Route path="/show" element={<ShowTodoList todos={todos} />} />
        {console.log(todos)}
        <Route path="/update/:id" element={<UpdateTodo />} />
      </Routes>
    </Router>
  );
}

export default App;
