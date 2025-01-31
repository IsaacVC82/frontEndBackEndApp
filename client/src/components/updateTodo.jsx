import { useState, useEffect } from "react";
import axios from "axios";

export function UpdateTodo({ id, handleClose, handleEdited }) {
  const [data, setData] = useState({
    title: "",
    description: "",
    date: "",
    priority: "Baja", 
    done: false,
  });

  // Cargar los datos existentes de la tarea al abrir el formulario
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}todo/${id}`)
      .then((res) => {
        setData(res.data); // Actualiza los datos con la respuesta del backend
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

    if (!data.date || !data.priority) {
      alert("La fecha y la prioridad son obligatorias.");
      return;
    }

    // Enviar los datos actualizados al servidor
    axios
      .put(`${process.env.REACT_APP_API_URL}todo/${id}`, data)
      .then((res) => {
        console.log("Tarea actualizada:", res.data);
        handleEdited(); // Actualiza la lista de tareas en el componente principal
        handleClose();  // Cierra el modal o el formulario
      })
      .catch((err) => {
        console.error("Error al actualizar la tarea:", err.message);
      });
  }

  return (
    <div className="app-container">
      <h2>Actualizar Tarea</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Título</label>
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
          required
        />
        
        <label htmlFor="description">Descripción</label>
        <input
          type="text"
          name="description"
          value={data.description}
          onChange={handleChange}
          required
        />
        
        <label htmlFor="date">Fecha</label>
        <input
          type="date"
          name="date"
          value={data.date}
          onChange={handleChange}
          required
        />
        
        <label htmlFor="priority">Prioridad</label>
        <select
          name="priority"
          value={data.priority}
          onChange={handleChange}
          
        >
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>

        <label htmlFor="done">Hecho</label>
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



