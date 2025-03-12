import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const UpdateTodo = ({ fetchTodos }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [todo, setTodo] = useState({
    title: '',
    description: '',
    date: '',
    priority: 'Baja',
    done: false,
    days: [],
  });

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/todo/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const todoData = {
          ...res.data,
          date: res.data.date ? res.data.date.split('T')[0] : '',
        };
        setTodo(todoData);
      } catch (err) {
        console.error("Error al cargar la tarea:", err.message);
      }
    };

    fetchTodo();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value, type, checked, options } = e.target;
    if (name === 'days') {
      const selectedDays = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
      setTodo({ ...todo, days: selectedDays });
    } else {
      setTodo({ ...todo, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/api/todo/${id}`, todo, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchTodos();
      navigate('/show');
    } catch (err) {
      console.error("Error al actualizar la tarea:", err.message);
    }
  };

  return (
    <div className="app-container">
      <h2>Actualizar Tarea</h2>
      <form onSubmit={handleSubmit}>
        <label>Título:</label>
        <input type="text" name="title" value={todo.title} onChange={handleChange} required />

        <label>Descripción:</label>
        <textarea name="description" value={todo.description} onChange={handleChange} required />

        <label>Fecha:</label>
        <input type="date" name="date" value={todo.date} onChange={handleChange} required />

        <label>Prioridad:</label>
        <select name="priority" value={todo.priority} onChange={handleChange} required>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>

        <label>Días de repetición:</label>
        <select name="days" multiple={true} value={todo.days} onChange={handleChange}>
          <option value="Lunes">Lunes</option>
          <option value="Martes">Martes</option>
          <option value="Miércoles">Miércoles</option>
          <option value="Jueves">Jueves</option>
          <option value="Viernes">Viernes</option>
          <option value="Sábado">Sábado</option>
          <option value="Domingo">Domingo</option>
        </select>

        <label>Completada:</label>
        <input type="checkbox" name="done" checked={todo.done} onChange={handleChange} />

        <button type="submit">Actualizar Tarea</button>
      </form>
    </div>
  );
};

export default UpdateTodo;
