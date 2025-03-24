import { useState, useEffect } from "react";
import axios from "axios";

const UpdateTodo = ({ todoId, username, onUpdate }) => {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    date: "",
    priority: "",
    done: false,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!todoId) {
      setError("ID de la tarea no válido.");
      return;
    }
    const fetchTodo = async () => {
      try {
        console.log("Obteniendo tarea con ID:", todoId);
        const response = await axios.get(`https://frontendbackendapp.onrender.com/api/todos/${todoId}`);
        setTodo(response.data);
      } catch (err) {
        console.error("Error al obtener la tarea:", err);
        setError("Error al obtener la tarea.");
      }
    };
    fetchTodo();
  }, [todoId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTodo((prevTodo) => ({
      ...prevTodo,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todoId) {
      setError("No se puede actualizar una tarea sin ID válido.");
      return;
    }
    try {
      console.log("Actualizando tarea con ID:", todoId, "Datos:", todo);
      const response = await axios.put(`https://frontendbackendapp.onrender.com/api/todos/${todoId}`, todo);
      console.log("Respuesta del servidor:", response.data);
      if (typeof onUpdate === "function") {
        onUpdate();
      } else {
        console.warn("onUpdate no es una función válida.");
      }
    } catch (err) {
      console.error("Error al actualizar la tarea:", err);
      setError("Error al actualizar la tarea.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input type="text" name="title" value={todo.title} onChange={handleChange} placeholder="Título" required />
      <textarea name="description" value={todo.description} onChange={handleChange} placeholder="Descripción" />
      <input type="date" name="date" value={todo.date} onChange={handleChange} />
      <select name="priority" value={todo.priority} onChange={handleChange}>
        <option value="">Seleccionar prioridad</option>
        <option value="Alta">Alta</option>
        <option value="Media">Media</option>
        <option value="Baja">Baja</option>
      </select>
      <label>
        Completado
        <input type="checkbox" name="done" checked={todo.done} onChange={handleChange} />
      </label>
      <button type="submit">Actualizar</button>
    </form>
  );
};

export default UpdateTodo;

