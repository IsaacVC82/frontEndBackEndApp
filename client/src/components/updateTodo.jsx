import { useParams, useNavigate } from 'react-router-dom';  
import { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateTodo = () => {
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
    // Obtener la tarea desde el backend con el ID de la URL
    axios.get(`${process.env.REACT_APP_API_URL}/api/todos/${id}`)
      .then(res => {
        setTodo(res.data);  // Cargar los datos de la tarea en el estado
      })
      .catch(err => {
        console.error("Error al cargar la tarea:", err.message);
      });
  }, [id]);  // Cuando el ID cambie, se vuelve a cargar la tarea

  // Función para manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Función para actualizar la tarea
  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.put(`${process.env.REACT_APP_API_URL}/api/todos/${id}`, todo)
      .then(res => {
        console.log("Tarea actualizada:", res.data);
        // Redirigir a la página de ver tareas después de actualizar
        navigate('/show');
      })
      .catch(err => {
        console.error("Error al actualizar la tarea:", err.message);
      });
  };

  return (
    <div>
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
            <option value="Low">Baja</option>
            <option value="Medium">Media</option>
            <option value="High">Alta</option>
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
