import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateTodo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    date: "",
    priority: "Baja",
    done: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cargar los datos de la tarea cuando el componente se monta
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/todos/${id}`);
        if (!response.ok) {
          throw new Error("No se pudo obtener la tarea");
        }
        const data = await response.json();

        setTodo({
          title: data.title,
          description: data.description,
          date: data.date ? data.date.split("T")[0] : "", // Formato YYYY-MM-DD
          priority: data.priority,
          done: data.done,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error al cargar la tarea:", error);
        setError("No se pudo cargar la tarea.");
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTodo({
      ...todo,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Enviar los datos actualizados
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la tarea");
      }

      navigate("/");
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      setError("No se pudo actualizar la tarea.");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="app-container">
      <h2>Editar Tarea</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input type="text" name="title" value={todo.title} onChange={handleChange} required />
        </div>

        <div>
          <label>Descripción:</label>
          <textarea name="description" value={todo.description} onChange={handleChange} required />
        </div>

        <div>
          <label>Fecha:</label>
          <input type="date" name="date" value={todo.date} onChange={handleChange} required />
        </div>

        <div>
          <label>Prioridad:</label>
          <select name="priority" value={todo.priority} onChange={handleChange} required>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </div>

        <div>
          <label>Estado:</label>
          <input type="checkbox" name="done" checked={todo.done} onChange={handleChange} />
          <span>{todo.done ? "Hecho" : "Pendiente"}</span>
        </div>

        <button type="submit">Actualizar Tarea</button>
      </form>
    </div>
  );
}

export default UpdateTodo;

