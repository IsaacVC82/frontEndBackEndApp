import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateTodo = ({ todoId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('Baja');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado de carga

  useEffect(() => {
    // Obtener los detalles de la tarea para actualizar
    const fetchTodo = async () => {
      try {
        // Suponiendo que la URL de la API para obtener una tarea por ID es /api/calendar/todos/:id
        const response = await axios.get(`/api/calendar/todos/${todoId}`);
        const todo = response.data;
        setTitle(todo.title);
        setDescription(todo.description);
        setDate(todo.date);
        setPriority(todo.priority);
        setDone(todo.done);
      } catch (err) {
        console.error('Error al obtener la tarea:', err);
        setError('No se pudo obtener la tarea. Intenta nuevamente.');
      }
    };

    fetchTodo();
  }, [todoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Iniciar la carga

    try {
      const response = await axios.put(`https://calendarific.com/api/v2/holidays/${todoId}`, {
        title,
        description,
        date,
        priority,
        done,
      });
      console.log('Tarea actualizada:', response.data);
      
      // Limpiar los campos después de la actualización
      setTitle('');
      setDescription('');
      setDate('');
      setPriority('Baja');
      setDone(false);
    } catch (err) {
      console.error('Error al actualizar la tarea:', err);
      setError('No se pudo actualizar la tarea. Intenta nuevamente.');
    } finally {
      setLoading(false); // Finalizar la carga
    }
  };

  return (
    <div>
      <h2>Actualizar Tarea</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <div className="loading-spinner">Cargando...</div>} {/* Animación de carga */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Fecha:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Prioridad:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
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
            checked={done}
            onChange={(e) => setDone(e.target.checked)}
          />
        </div>
        <button type="submit" disabled={loading}>Actualizar Tarea</button>
      </form>
    </div>
  );
};

export default UpdateTodo;







