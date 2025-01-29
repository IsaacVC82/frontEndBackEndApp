import React, { useState } from 'react';

export const CreateTodo = ({ handleAddTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('Baja');  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert('Por favor, ingrese título y descripción');
      return;
    }

    // Si no se selecciona fecha, establecer la fecha actual
    const newTodo = {
      title,
      description,
      date: date || new Date().toISOString(),  // Si no hay fecha, usar la fecha actual
      priority,
      done: false,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      if (response.ok) {
        handleAddTodo(data);  // Agrega la tarea creada al estado de las tareas
        setTitle('');
        setDescription('');
        setDate('');
        setPriority('Baja');  // Restablece la prioridad a 'Baja'
      } else {
        console.error('Error al crear el TODO');
      }
    } catch (error) {
      console.error('Error al crear TODO:', error);
    }
  };

  return (
    <div className="container">
      <h2>Crear Tarea</h2>
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
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
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
            required
          >
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
        <button type="submit">Crear Tarea</button>
      </form>
    </div>
  );
};

export default CreateTodo;

