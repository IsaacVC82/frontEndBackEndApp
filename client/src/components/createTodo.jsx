import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "https://frontendbackendapp.onrender.com";

const CreateTodo = () => {
  const [title, setTitle] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/api/todo`, { title }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Tarea creada con éxito");
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Añadir tarea"
      />
      <button type="submit">Agregar</button>
    </form>
  );
};

export default CreateTodo;
