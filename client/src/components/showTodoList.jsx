import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UpdateTodo } from "./updateTodo";

function TodoCard({ data, handleEdit, handleDelete }) {
    const { id, title, description } = data;

    return (
        <li key={id}>
            <div className="title-description">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>

            <div className="button-container">
                <button className="button" name={id} onClick={handleEdit}>
                    edit
                </button>
                <button className="button" name={id} onClick={handleDelete}>
                    delete
                </button>
            </div>
        </li>
    );
}

export function ShowTodoList() {
    const [todo, setTodo] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState("");
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/todo")
            .then((res) => {
                console.log(res.data);
                setTodo(res.data); 
            })
            .catch((err) => {
                console.error("Error al obtener TODOs:", err.message);
            });
    }, [update]);

    function handleEdit(e) {
        setId(e.target.name);
        setOpen(true);
    }

    function handleUpdate() {
        setUpdate(!update);
    }

    function handleDelete(e) {
        const todoId = e.target.name;
        axios
            .delete(`http://localhost:8000/api/todo/${todoId}`)
            .then(() => {
                setTodo((data) => data.filter((todo) => todo.id !== todoId));
            })
            .catch((err) => {
                console.error("Error al eliminar TODO:", err.message);
            });
    }

    function handleClose() {
        setId("");
        setOpen(false);
    }

    return (
        <section className="container">
            <Link to="/create-todo" className="button-new">
                <button className="button">New</button>
            </Link>
            <section className="contents">
                <h1>TODO</h1>
                <ul className="list-container">
                    {todo.map((data) => (
                        <TodoCard
                            key={data.id}
                            data={data}
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
                            handleUpdate={handleUpdate}
                        />
                    </div>
                </section>
            )}
        </section>
    );
}
