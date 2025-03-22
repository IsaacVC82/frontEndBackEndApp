import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoCalendar from './TodoCalendar';

const CreateTodo = ({ username }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('Baja');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [holidays, setHolidays] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('https://frontendbackendapp.onrender.com/api/todos', {
        title,
        description,
        date: date ? new Date(date).toISOString().split("T")[0] : null,
        priority,
        done,
        username,
      });

      console.log('Tarea creada:', response.data);
      setTitle('');
      setDescription('');
      setDate('');
      setPriority('Baja');
      setDone(false);
    } catch (err) {
      console.error('Error al crear la tarea:', err);
      setError(err.response ? err.response.data.message : 'No se pudo crear la tarea.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h2>Crear Tarea</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <div>Cargando...</div>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={loading}>Crear Tarea</button>
      </form>
    </div>
  );
};

export default CreateTodo;








