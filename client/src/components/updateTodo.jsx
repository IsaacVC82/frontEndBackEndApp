import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateTodo = ({ username, onUpdate }) => {
  const { id: todoId } = useParams();
  const [todo, setTodo] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`https://frontendbackendapp.onrender.com/api/todos/${todoId}`);
        setTodo(response.data);
      } catch (err) {
        setError(`Error al obtener la tarea: ${err.response?.data?.message || err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (todoId) fetchTodo();
  }, [todoId]);

  const handleChange = (e) => {
    setTodo((prevTodo) => ({ ...prevTodo, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://frontendbackendapp.onrender.com/api/todos/${todoId}`, todo, {
        headers: { 'Content-Type': 'application/json' },
      });
      onUpdate(response.data);
    } catch (err) {
      setError(`Error al actualizar la tarea: ${err.response?.data?.message || err.message}`);
    }
  };

  if (loading) return <p>Cargando tarea...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Actualizar Tarea</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input type="text" name="title" value={todo.title} onChange={handleChange} required />
        </label>
        <label>
          Descripción:
          <textarea name="description" value={todo.description} onChange={handleChange} required />
        </label>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default UpdateTodo;
