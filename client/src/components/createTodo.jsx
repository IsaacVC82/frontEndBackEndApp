import React, { useState } from "react";

function CreateTodo({ handleAddTodo }) {
  const [data, setData] = useState({
    title: "",
    description: "",
    date: "",
    priority: "Baja",
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
    handleAddTodo(data);
    setData({ title: "", description: "", date: "", priority: "Baja", done: false });
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
      <button type="submit">Crear Tarea</button>
    </form>
    </div>
  );
}

export default CreateTodo;

