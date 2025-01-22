import { useState, useEffect } from "react";
import axios from "axios";

export function UpdateTodo({ id, handleClose, handleEdited }) {
    const [data, setData] = useState({
        title: "",
        description: "",
        date: "",
        priority: "Low",
        done: false,
    });

    // Cargar datos existentes de la tarea al abrir el formulario
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}api/todo/${id}`)
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
            .put(`${process.env.REACT_APP_API_URL}/api/todo/${id}`, data)
            .then((res) => {
                console.log(res.data.message);
                handleEdited(); 
                handleClose(); 
            })
            .catch((err) => {
                console.error("Error al actualizar la tarea:", err.message);
            });
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <label htmlFor="title" className="label">
                Título
            </label>
            <input
                type="text"
                name="title"
                className="input"
                value={data.title}
                onChange={handleChange}
            />
            <label htmlFor="description" className="label">
                Descripción
            </label>
            <input
                type="text"
                name="description"
                className="input"
                value={data.description}
                onChange={handleChange}
            />
            <label htmlFor="date" className="label">
                Fecha
            </label>
            <input
                type="date"
                name="date"
                className="input"
                value={data.date}
                onChange={handleChange}
            />
            <label htmlFor="priority" className="label">
                Prioridad
            </label>
            <select
                name="priority"
                className="input"
                value={data.priority}
                onChange={handleChange}
            >
                <option value="Low">Baja</option>
                <option value="Medium">Media</option>
                <option value="High">Alta</option>
            </select>
            <label htmlFor="done" className="label">
                Hecho
            </label>
            <input
                type="checkbox"
                name="done"
                className="checkbox"
                checked={data.done}
                onChange={handleChange}
            />
            <button type="submit" className="button">
                Actualizar
            </button>
        </form>
    );
}
