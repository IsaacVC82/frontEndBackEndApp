import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UpdateTodo } from "./updateTodo";

function TodoCard({ data, handleEdit, handleDelete }) {
    const { id, title, description, date, priority, done } = data;

    return (
        <li key={id} className={`todo-card ${done ? "completed" : ""}`}>
            <div className="title-description">
                <h3>{title}</h3>
                <p>{description}</p>
                <p>Fecha: {date || "No especificada"}</p>
                <p>Prioridad: {priority || "Baja"}</p>
                <p>Estado: {done ? "Hecho" : "Pendiente"}</p>
            </div>
            <div className="button-container">
                <button className="button" name={id} onClick={handleEdit}>
                    Editar
                </button>
                <button className="button" name={id} onClick={handleDelete}>
                    Eliminar
                </button>
            </div>
        </li>
    );
}

export function ShowTodoList() {
    const [todos, setTodos] = useState([]); 
    const [open, setOpen] = useState(false);
    const [id, setId] = useState("");
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/todo`)
            .then((res) => {
                console.log(res.data);
                setTodos(res.data);
            })
            .catch((err) => {
                console.error("Error al obtener TODOs:", err.message);
            });
    }, [update]);

    function handleEdit(e) {
        setId(e.target.name); // Guardar el ID de la tarea que se desea editar
        setOpen(true);
    }

    function handleUpdate() {
        setUpdate(!update); // Forzar una actualización de la lista de tareas
    }

    function handleDelete(e) {
        const todoId = e.target.name;
        axios
            .delete(`${process.env.REACT_APP_API_URL}/api/todo/${todoId}`)
            .then(() => {
                setTodos((data) => data.filter((todo) => todo.id !== todoId));
            })
            .catch((err) => {
                console.error("Error al eliminar TODO:", err.message);
            });
    }

    function handleClose() {
        setId("");
        setOpen(false); // Cerrar el modal de edición
    }

    return (
        <section className="container">
            <Link to="/create-todo" className="button-new">
                <button className="button">Nueva Tarea</button>
            </Link>
            <section className="contents">
                <h1>Lista de Tareas</h1>
                <ul className="list-container">
                    {todos.map((data) => (
                        <TodoCard
                            key={data.id}
                            data={{
                                id: data.id,
                                title: data.title || "Sin título",
                                description: data.description || "Sin descripción",
                                date: data.date || "No especificada",
                                priority: data.priority || "Baja",
                                done: data.done || false,
                            }}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ))}
                </ul>
            </section>
            {open && (
                <section className="update-container">
                    <div className="update-contents">
                        <p onClick={handleClose} className="close">
                            &times;
                        </p>
                        <UpdateTodo
                            id={id} 
                            handleClose={handleClose}
                            handleEdited={handleUpdate}
                        />
                    </div>
                </section>
            )}
        </section>
    );
}
