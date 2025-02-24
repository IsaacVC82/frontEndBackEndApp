import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateTodo = ({ fetchTodos }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

  const [todo, setTodo] = useState({
    title: '',
    description: '',
    date: '',
    priority: 'Baja',
    done: false,
  });

  useEffect(() => {
    axios.get(`${API_URL}/api/todo/${id}`)
      .then(res => {
        const todoData = {
          ...res.data,
          date: res.data.date.split('T')[0],
        };
        setTodo(todoData);
      })
      .catch(err => {
        console.error("Error al cargar la tarea:", err.message);
      });
  }, [id, API_URL]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTodo(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`${API_URL}/api/todo/${id}`, todo)
      .then(() => {
        fetchTodos();
        navigate('/show');
      })
      .catch(err => {
        console.error("Error al actualizar la tarea:", err.message);
      });
  };

  return (
    <div className="app-container">
      <h2>Actualizar Tarea</h2>
      <form onSubmit={handleSubmit}>
        <label>Título:</label>
        <input
          type="text"
          name="title"
          value={todo.title}
          onChange={handleChange}
          required
        />
        
        <label>Descripción:</label>
        <textarea
          name="description"
          value={todo.description}
          onChange={handleChange}
          required
        />
        
        <label>Fecha:</label>
        <input
          type="date"
          name="date"
          value={todo.date}
          onChange={handleChange}
          required
        />
        
        <label>Prioridad:</label>
        <select
          name="priority"
          value={todo.priority}
          onChange={handleChange}
          required
        >
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
        
        <label>Completada:</label>
        <input
          type="checkbox"
          name="done"
          checked={todo.done}
          onChange={handleChange}
        />
        
        <button type="submit">Actualizar Tarea</button>
      </form>
    </div>
  );
};

export default UpdateTodo;
