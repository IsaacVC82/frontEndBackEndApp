import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function CreateTodo() {
    const [data, setData] = useState({
        title: "",
        description: "",
        date: "",
        priority: "Low",
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

        // Validar campos requeridos
        if (!data.title || !data.description || !data.date) {
            console.error("Todos los campos requeridos deben ser completados.");
            return;
        }

        const todo = {
            title: data.title,
            description: data.description,
            date: data.date,
            priority: data.priority,
            done: data.done,
        };

        axios
            .post(`${process.env.REACT_APP_API_URL}todo`, todo)
            .then((res) => {
                setData({
                    title: "",
                    description: "",
                    date: "",
                    priority: "Low",
                    done: false,
                }); // Resetear el formulario
                console.log(res.data.message);
            })
            .catch((err) => {
                console.error("No se pudo crear la tarea.");
                console.error(err.message);
            });
    }

    return (
        <section className="container">
            <Link to="/" className="button-back">
                <button type="button" className="button">Volver</button>
            </Link>
            <section className="contents">
                <form onSubmit={handleSubmit} className="form-container" noValidate>
                    <label className="label" htmlFor="title">Título</label>
                    <input
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                        className="input"
                    />
                    <label className="label" htmlFor="description">Descripción</label>
                    <input
                        type="text"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        className="input"
                    />
                    <label className="label" htmlFor="date">Fecha</label>
                    <input
                        type="date"
                        name="date"
                        value={data.date}
                        onChange={handleChange}
                        className="input"
                    />
                    <label className="label" htmlFor="priority">Prioridad</label>
                    <select
                        name="priority"
                        value={data.priority}
                        onChange={handleChange}
                        className="input"
                    >
                        <option value="Low">Baja</option>
                        <option value="Medium">Media</option>
                        <option value="High">Alta</option>
                    </select>
                    <label className="label" htmlFor="done">Hecho</label>
                    <input
                        type="checkbox"
                        name="done"
                        checked={data.done}
                        onChange={handleChange}
                        className="checkbox"
                    />
                    <button type="submit" className="button">Crear Tarea</button>
                </form>
            </section>
        </section>
    );
}
