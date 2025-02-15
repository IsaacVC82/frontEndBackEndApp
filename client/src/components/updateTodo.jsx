import { useParams, useNavigate } from 'react-router-dom';  
import { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateTodo = ({ fetchTodos }) => {
  const { id } = useParams();  // Obtener el ID desde la URL
  const navigate = useNavigate();  
  const [todo, setTodo] = useState({
    title: '',
    description: '',
    date: '',
    priority: '',
    done: false
  });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/todos/${id}`)
      .then(res => {
        setTodo(res.data);  // Cargar los datos de la tarea en el estado
      })
      .catch(err => {
        console.error("Error al cargar la tarea:", err.message);
      });
  }, [id]);  // Cuando el ID cambie, se vuelve a cargar la tarea

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.put(`${process.env.REACT_APP_API_URL}/api/todos/${id}`, todo)
      .then(res => {
        console.log("Tarea actualizada:", res.data);
        fetchTodos();  // Actualizar la lista de tareas
        navigate('/show');  // Redirigir a la página de ver tareas
      })
      .catch(err => {
        console.error("Error al actualizar la tarea:", err.message);
      });
  };

  return (
    <div className="app-container">
      <h2>Actualizar Tarea</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="title"
            value={todo.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={todo.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Fecha:</label>
          <input
            type="date"
            name="date"
            value={todo.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Prioridad:</label>
          <select
            name="priority"
            value={todo.priority}
            onChange={handleChange}
          >
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
        <div>
          <label>Completada:</label>
          <input
            type="checkbox"
            name="done"
            checked={todo.done}
            onChange={() => setTodo(prevState => ({
              ...prevState,
              done: !prevState.done
            }))}
          />
        </div>
        <button type="submit">Actualizar Tarea</button>
      </form>
    </div>
  );
};

export default UpdateTodo;