import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function CreateTodo() {
    const [data, setData] = useState({ title: "", description: "" , date: ""});

    function handleChange(e) {
        setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        const todo = {
            title: data.title,
            description: data.description,
            date: data.date
        };

        axios
            .post("http://localhost:8000/api/todo", todo)
            .then((res) => {
                setData({ title: "", description: "" });
                console.log(res.data.message);
            })
            .catch((err) => {
                console.error("Error couldn't create TODO");
                console.error(err.message);
            });
    }

    return (
        <section className="container">
            <Link to="/" className="button-back">
                <button type="button" className="button">
                    back
                </button>
            </Link>
            <section className="contents">
                <form
                    onSubmit={handleSubmit}
                    className="form-container"
                    noValidate
                >
                    <label className="label" htmlFor="title">
                        Titulo
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                        className="input"
                    />
                    <label className="label" htmlFor="description">
                        Descripción
                    </label>
                    <input
                        type="text"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        className="input"
                    />
                    <label className="label" htmlFor="date">
                        Fecha
                    </label>
                    <input 
                    type="date"
                    name="date"
                    value={data.date}
                    onChange={handleChange}
                    className="input">
                        
                    </input>
                    <button type="submit" className="button">
                        crear tarea
                    </button>
                </form>
            </section>
        </section>
    );
}
