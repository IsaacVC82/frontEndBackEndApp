import { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const CreateTodo = ({ fetchTodos }) => {
  const token = localStorage.getItem('token');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    priority: 'Baja',
    done: false,
    days: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked, options } = e.target;
    if (name === 'days') {
      const selectedDays = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
      setFormData({ ...formData, days: selectedDays });
    } else {
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${API_URL}/api/todo`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({
        title: '',
        description: '',
        date: '',
        priority: 'Baja',
        done: false,
        days: [],
      });
      await fetchTodos();
    } catch (err) {
      console.error('Error al crear la tarea:', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container">
      <h2>Crear Tarea</h2>
      <form onSubmit={handleSubmit}>
        <label>Título:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label>Descripción:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label>Fecha:</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />

        <label>Prioridad:</label>
        <select name="priority" value={formData.priority} onChange={handleChange} required>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>

        <label>Completada:</label>
        <input type="checkbox" name="done" checked={formData.done} onChange={handleChange} />

        <button type="submit" disabled={isSubmitting} style={{ backgroundColor: isSubmitting ? '#3b56d3' : '#4c6ef5', opacity: isSubmitting ? 0.7 : 1 }}>
          {isSubmitting ? 'Creando...' : 'Crear Tarea'}
        </button>
      </form>
    </div>
  );
};

export default CreateTodo;









