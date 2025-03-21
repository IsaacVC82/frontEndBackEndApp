import React, { useState, useEffect } from "react";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("");
  const [done, setDone] = useState(false);
  const [username, setUsername] = useState("");
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
  }, []);

  // Manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTodo = {
      title,
      description,
      date,
      priority,
      done,
      username,
    };

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Tarea creada:", data);

        // Limpiar los campos después de crear la tarea
        setTitle("");
        setDescription("");
        setDate("");
        setPriority("");
        setDone(false);
        setUsername("");
        setHolidays([]); // Limpiar los días festivos si es necesario
      } else {
        console.error("Error al crear tarea:", data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div>
      <h2>Crear Tarea</h2>
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
        <div>
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear Tarea</button>
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

export default CreateTodo;









