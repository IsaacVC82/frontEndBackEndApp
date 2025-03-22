import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateTodo = ({ username, onUpdate }) => {
  const { id: todoId } = useParams(); // Obtener el id desde la URL
  const [todo, setTodo] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`https://frontendbackendapp.onrender.com${todoId}`);
        setTodo(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al obtener la tarea.');
        setLoading(false);
      }
    };

    fetchTodo();
  }, [todoId]);

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://frontendbackendapp.onrender.com${todoId}`, todo);
      onUpdate();
    } catch (err) {
      setError('Error al actualizar la tarea.');
    }
  };

  if (loading) return <p>Cargando tarea...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Actualizar Tarea</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            name="title"
            value={todo.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="description"
            value={todo.description}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default UpdateTodo;





