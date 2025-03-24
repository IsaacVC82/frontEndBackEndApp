import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateTodo = ({ username, onUpdate }) => {
  const { id: todoId } = useParams();
  const [todo, setTodo] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        console.log("Obteniendo tarea con ID:", todoId);
        const response = await axios.get(
          `https://frontendbackendapp.onrender.com/api/todos/${todoId}`
        );
        console.log("Tarea obtenida:", response.data);
        setTodo(response.data);
      } catch (err) {
        console.error("Error al obtener la tarea:", err);
        setError("Error al obtener la tarea.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [todoId]);

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Enviando actualización para la tarea:", todoId, todo);
      await axios.put(
        `https://frontendbackendapp.onrender.com/api/todos/${todoId}`,
        todo
      );
      console.log("Tarea actualizada con éxito.");
      if (typeof onUpdate === "function") {
        onUpdate();
      } else {
        console.warn("onUpdate no es una función.");
      }
    } catch (err) {
      console.error("Error al actualizar la tarea:", err);
      setError("Error al actualizar la tarea.");
    }
  };

  if (loading) return <p>Cargando tarea...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Actualizar Tarea</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            name="title"
            value={todo.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="description"
            value={todo.description}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default UpdateTodo;


