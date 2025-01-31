import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export function UpdateTodo({ handleEdited }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [data, setData] = useState({
    title: "",
    description: "",
    date: "",
    priority: "Baja",
    done: false,
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}todo/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error al cargar los datos de la tarea:", err.message);
      });
  }, [id]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_API_URL}todo/${id}`, data)
      .then((res) => {
        console.log("Tarea actualizada:", res.data);
        handleEdited(); // Actualiza la lista de tareas
        navigate("/show"); // Redirige a la vista de las tareas
      })
      .catch((err) => {
        console.error("Error al actualizar la tarea:", err.message);
      });
  }

  return (
    <div className="app-container">
    <form onSubmit={handleSubmit}>
      <label>Título</label>
      <input
        type="text"
        name="title"
        value={data.title}
        onChange={handleChange}
        required
      />
      <label>Descripción</label>
      <input
        type="text"
        name="description"
        value={data.description}
        onChange={handleChange}
        required
      />
      <label>Fecha</label>
      <input
        type="date"
        name="date"
        value={data.date}
        onChange={handleChange}
        required
      />
      <label>Prioridad</label>
      <select
        name="priority"
        value={data.priority}
        onChange={handleChange}
      >
        <option value="Baja">Baja</option>
        <option value="Media">Media</option>
        <option value="Alta">Alta</option>
      </select>
      <label>Hecho</label>
      <input
        type="checkbox"
        name="done"
        checked={data.done}
        onChange={handleChange}
      />
      <button type="submit">Actualizar Tarea</button>
    </form>
    </div>
  );
}

export default UpdateTodo;
