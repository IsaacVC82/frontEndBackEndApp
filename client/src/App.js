import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateTodo from './components/createTodo';
import ShowTodoList from './components/showTodoList';
import UpdateTodo from './components/updateTodo';
import { useParams } from 'react-router-dom';

const App = () => {
  const [username, setUsername] = useState('');
  const [isUsernameSet, setIsUsernameSet] = useState(false);

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== '') {
      setIsUsernameSet(true);
    } else {
      alert('Por favor, introduce un nombre de usuario.');
    }
  };

  return (
    <Router>
      <div className="app-container">
        {!isUsernameSet ? (
          <form onSubmit={handleUsernameSubmit}>
            <h2>Introduce tu nombre de usuario</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nombre de usuario"
              required
            />
            <button type="submit">Continuar</button>
          </form>
        ) : (
          <>
            <nav>
              <Link to="/">Crear Tarea</Link> |
              <Link to="/show">Ver Lista de Tareas</Link>
            </nav>
            <Routes>
              <Route path="/" element={<CreateTodo username={username} />} />
              <Route path="/show" element={<ShowTodoList username={username} />} />
              <Route path="/update/:id" element={<UpdateTodo username={username} />} />
              </Routes>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;


