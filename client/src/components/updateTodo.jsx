// UpdateTodo.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoCalendar from './TodoCalendar'; // Importa el componente TodoCalendar

const UpdateTodo = ({ todoId, username, onUpdate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('Baja');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [holidays, setHolidays] = useState([]); // Para almacenar los días festivos

  // Obtener datos de la tarea existente
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://frontendbackendapp.onrender.com/todos/${todoId}`);
        const { title, description, date, priority, done } = response.data;
        setTitle(title);
        setDescription(description);
        setDate(date);
        setPriority(priority);
        setDone(done);
      } catch (err) {
        console.error('Error al obtener la tarea:', err);
        setError('No se pudo cargar la tarea.');
      } finally {
        setLoading(false);
      }
    };

    if (todoId) {
      fetchTodo();
    }
  }, [todoId]);

  // Obtener días festivos desde Calendarific
  useEffect(() => {
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

    fetchHolidays();
  }, []);

  // Función para actualizar la tarea
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(`https://frontendbackendapp.onrender.com/todos/${todoId}`, {
        title,
        description,
        date,
        priority,
        done,
        username,
      });
      console.log('Tarea actualizada:', response.data);
      if (onUpdate) onUpdate(); // Llamar a la función onUpdate si está definida
    } catch (err) {
      console.error('Error al actualizar la tarea:', err);
      setError('No se pudo actualizar la tarea. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Actualizar Tarea</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <div>Cargando...</div>}
      <form onSubmit={handleUpdate}>
        <div>
          <label>Título:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Fecha:</label>
          <TodoCalendar selectedDate={date ? new Date(date) : new Date()} setSelectedDate={setDate} holidays={holidays} />
          </div>
        <div>
          <label>Prioridad:</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>
        <div>
          <label>Completado:</label>
          <input type="checkbox" checked={done} onChange={(e) => setDone(e.target.checked)} />
        </div>
        <button type="submit" disabled={loading}>Actualizar Tarea</button>
      </form>
    </div>
  );
};

export default UpdateTodo;







