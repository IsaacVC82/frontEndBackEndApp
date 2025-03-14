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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [resetKey, setResetKey] = useState(0); // Clave para forzar re-renderizado

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
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_URL}/api/todos`, { ...data, username });
      handleAddTodo(response.data);

      // Limpiar formulario
      setData({ title: "", description: "", date: "", priority: "Baja", done: false });
      setResetKey((prevKey) => prevKey + 1); // Forzar re-render

      setSuccessMessage("¡Tarea creada exitosamente!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error al crear la tarea:", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h3>Crear una nueva tarea</h3>
      <form onSubmit={handleSubmit} key={resetKey}>
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
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "8px 16px",
            backgroundColor: isSubmitting ? "#0056b3" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            transition: "background-color 0.3s ease"
          }}
        >
          {isSubmitting ? "Creando..." : "Crear tarea"}
        </button>
      </form>
      {successMessage && (
        <p style={{ color: "#A7C7E7", marginTop: "10px" }}>
          {successMessage}
        </p>
      )}
    </div>
  );
};

export default CreateTodo;









