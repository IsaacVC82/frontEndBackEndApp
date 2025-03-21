import React, { useState, useEffect } from "react";

const UpdateTodo = ({ todoId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("");
  const [done, setDone] = useState(false);
  const [holidays, setHolidays] = useState([]);

  // Función para obtener los días festivos
  const fetchHolidays = async (country, year) => {
    try {
      const response = await fetch(`/api/holidays?country=${country}&year=${year}`);
      const data = await response.json();
      setHolidays(data.response.holidays); // Establecer días festivos obtenidos
    } catch (error) {
      console.error("Error al obtener los días festivos:", error);
    }
  };

  // Llamada a la API cuando el componente se monta
  useEffect(() => {
    fetchHolidays('MX', '2025'); // Obtener días festivos para México en 2025
    // Obtener datos de la tarea a actualizar
    const fetchTodo = async () => {
      const response = await fetch(`/api/todos/${todoId}`);
      const data = await response.json();
      setTitle(data.title);
      setDescription(data.description);
      setDate(data.date);
      setPriority(data.priority);
      setDone(data.done);
    };

    fetchTodo();
  }, [todoId]);

  // Manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTodo = {
      title,
      description,
      date,
      priority,
      done,
    };

    try {
      const response = await fetch(`/api/todos/${todoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Tarea actualizada:", data);

        // Limpiar los campos después de actualizar la tarea
        setTitle("");
        setDescription("");
        setDate("");
        setPriority("");
        setDone(false);
        setHolidays([]); // Limpiar los días festivos si es necesario
      } else {
        console.error("Error al actualizar tarea:", data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div>
      <h2>Actualizar Tarea</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Fecha:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Prioridad:</label>
          <input
            type="text"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
        </div>
        <div>
          <label>Completada:</label>
          <input
            type="checkbox"
            checked={done}
            onChange={() => setDone(!done)}
          />
        </div>
        <button type="submit">Actualizar Tarea</button>
      </form>

      <div>
        <h3>Días Festivos en México (2025):</h3>
        <ul>
          {holidays.map((holiday) => (
            <li key={holiday.date.iso}>
              {holiday.name} - {holiday.date.iso}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UpdateTodo;





