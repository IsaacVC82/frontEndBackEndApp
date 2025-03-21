import React, { useState } from 'react';
import axios from 'axios';

const CreateTodo = ({ username }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('Baja'); // Prioridad predeterminada
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado de carga

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Iniciar la carga

    try {
      const response = await axios.post('https://calendarific.com/api/v2/holidays', {
        title,
        description,
        date,
        priority,
        done,
        username,
      });
      console.log('Tarea creada:', response.data);
      
      // Limpiar los campos después de la creación
      setTitle('');
      setDescription('');
      setDate('');
      setPriority('Baja');
      setDone(false);
    } catch (err) {
      console.error('Error al crear la tarea:', err);
      setError('No se pudo crear la tarea. Intenta nuevamente.');
    } finally {
      setLoading(false); // Finalizar la carga
    }
  };

  return (
    <div>
      <h2>Crear Tarea</h2>
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
        <button type="submit" disabled={loading}>Crear Tarea</button>
      </form>
    </div>
  );
};

export default CreateTodo;











