import { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "https://frontendbackendapp.onrender.com";

const CreateTodo = ({ username, handleAddTodo }) => {
  const [data, setData] = useState({
    title: "",
    description: "",
    date: "",
    priority: "Baja",
    done: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Evitar envíos múltiples

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({ ...data, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      alert('Por favor ingresa tu nombre de usuario.');
      return;
    }
    if (isSubmitting) return; // Prevenir doble envío

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_URL}/api/todos`, { ...data, username });
      handleAddTodo(response.data); // Añadir la tarea a la lista
      setData({ title: "", description: "", date: "", priority: "Baja", done: false });
    } catch (err) {
      console.error("Error al crear la tarea:", err.message);
    } finally {
      setIsSubmitting(false); // Permitir nuevos envíos
    }
  };

  return (
    <div>
      <h3>Crear una nueva tarea</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={data.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={data.description}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          value={data.date}
          onChange={handleChange}
        />
        <select name="priority" value={data.priority} onChange={handleChange}>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
        <label>
        <label>Días de repetición:</label>
        <select name="days" multiple={true} value={data.days} onChange={handleChange}>
        <option value="Lunes">Lunes</option>
          <option value="Martes">Martes</option>
          <option value="Miércoles">Miércoles</option>
          <option value="Jueves">Jueves</option>
          <option value="Viernes">Viernes</option>
          <option value="Sábado">Sábado</option>
          <option value="Domingo">Domingo</option>
        </select>
          Hecho:
          <input
            type="checkbox"
            name="done"
            checked={data.done}
            onChange={handleChange}
          />
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creando..." : "Crear tarea"}
        </button>
      </form>
    </div>
  );
};

export default CreateTodo;






