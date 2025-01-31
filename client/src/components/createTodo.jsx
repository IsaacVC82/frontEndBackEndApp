import { useState } from "react";
import axios from "axios";

export function CreateTodo({ handleAddTodo }) {
  const [data, setData] = useState({
    title: "",
    description: "",
    date: "",
    priority: "Baja",  // Valor por defecto según el modelo
    done: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Validación: Asegúrate de que la fecha esté bien formateada
    if (!data.date || !data.priority) {
      alert("La fecha y la prioridad son obligatorias.");
      return;
    }

    // Enviar los datos al servidor
    axios
      .post(`${process.env.REACT_APP_API_URL}todo`, data)
      .then((res) => {
        console.log("Tarea creada:", res.data);
        handleAddTodo(res.data);  // Llama la función de callback para actualizar la lista de tareas
        setData({
          title: "",
          description: "",
          date: "",
          priority: "Baja",
          done: false,
        });
      })
      .catch((err) => {
        console.error("Error al crear la tarea:", err.message);
      });
  }

  return (
    <div className="app-container">
      <h2>Crear Nueva Tarea</h2>
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
        <div className="checkbox-container">
        <label htmlFor="done">Hecho</label>
        <input
          type="checkbox"
          name="done"
          checked={data.done}
          onChange={handleChange}
        />
        </div>
        <button type="submit">Crear Tarea</button>
      </form>
    </div>
  );
}

export default CreateTodo;
