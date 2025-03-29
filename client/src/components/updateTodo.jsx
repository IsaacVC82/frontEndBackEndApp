import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TodoCalendar from './TodoCalendar';

const UpdateTodo = ({ username, onUpdate }) => {
  const { id: todoId } = useParams();
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    date: "",
    priority: "Baja",
    done: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [holidays, setHolidays] = useState([]);

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

    const fetchHolidays = async () => {
      try {
        const apiKey = process.env.REACT_APP_CALENDARIFIC_API_KEY;
        const response = await axios.get('https://calendarific.com/api/v2/holidays', {
          params: {
            api_key: apiKey,
            country: 'MX',
            year: 2025,
          },
        });
        setHolidays(response.data.response.holidays);
      } catch (error) {
        console.error('Error al obtener los días festivos:', error);
      }
    };

    fetchTodo();
    fetchHolidays();
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
        {
          ...todo,
          date: todo.date ? new Date(todo.date).toISOString().split("T")[0] : null
        }
      );
      console.log("Tarea actualizada con éxito.");
      setSuccessMessage("Tarea actualizada correctamente.");
      setTodo({
        title: "",
        description: "",
        date: "",
        priority: "Baja",
        done: false
      }); // Limpiar los campos

      if (typeof onUpdate === "function") {
        onUpdate();
      } else {
        console.warn("onUpdate no es una función.");
      }

      // Limpiar el mensaje después de unos segundos
      setTimeout(() => setSuccessMessage(""), 3000);
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
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="title"
            value={todo.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={todo.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Fecha:</label>
          <TodoCalendar
            selectedDate={todo.date ? new Date(todo.date) : new Date()}
            setSelectedDate={(date) => setTodo({ ...todo, date })}
            holidays={holidays}
          />
        </div>
        <div>
          <label>Prioridad:</label>
          <select
            name="priority"
            value={todo.priority}
            onChange={handleChange}
          >
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>
        <div>
          <label>Completado:</label>
          <input
            type="checkbox"
            name="done"
            checked={todo.done}
            onChange={(e) => setTodo({ ...todo, done: e.target.checked })}
          />
        </div>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default UpdateTodo;




