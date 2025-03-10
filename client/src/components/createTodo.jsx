import { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "https://frontendbackendapp.onrender.com";

const CreateTodo = ({ username }) => {
  const [data, setData] = useState({
    title: "",
    description: "",
    date: "",
    priority: "Baja",
    done: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({ ...data, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      alert('Por favor, ingresa tu nombre de usuario.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/todos`, { ...data, username });
      console.log("Tarea creada:", response.data);
      setData({ title: "", description: "", date: "", priority: "Baja", done: false });
    } catch (err) {
      console.error("Error al crear la tarea:", err.response ? err.response.data : err.message);
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
          Hecho:
          <input
            type="checkbox"
            name="done"
            checked={data.done}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Crear tarea</button>
      </form>
    </div>
  );
};

export default CreateTodo;




