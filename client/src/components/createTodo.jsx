import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

function CreateTodo({ handleAddTodo }) {
  const [data, setData] = useState({
    title: "",
    description: "",
    date: "",
    priority: "Baja",
    done: false,
  });

  const token = localStorage.getItem('token');
  console.log('Token:', token);  
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/todo`, data, {
        headers: { Authorization: `Bearer ${token}` },  // Asegúrate de pasar el token aquí
      });
      console.log("Respuesta del servidor:", response.data);
      handleAddTodo(response.data);
      setData({ title: "", description: "", date: "", priority: "Baja", done: false });
    } catch (err) {
      console.error("Error al crear la tarea:", err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="app-container">
      <h2>Crear Nueva Tarea</h2>
      <form onSubmit={handleSubmit}>
        <label>Título</label>
        <input type="text" name="title" value={data.title} onChange={handleChange} required />
        <label>Descripción</label>
        <input type="text" name="description" value={data.description} onChange={handleChange} required />
        <label>Fecha</label>
        <input type="date" name="date" value={data.date} onChange={handleChange} required />
        <label>Prioridad</label>
        <select name="priority" value={data.priority} onChange={handleChange}>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
        <label>Hecho</label>
        <input type="checkbox" name="done" checked={data.done} onChange={handleChange} />
        <button type="submit">Crear Tarea</button>
      </form>
      <button onClick={() => navigate("/show")}>Ver Lista de Tareas</button>
    </div>
  );
}

export default CreateTodo;
