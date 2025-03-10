import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import CreateTodo from './components/createTodo';
import ShowTodoList from './components/showTodoList';
import UpdateTodo from './components/updateTodo';

const App = () => {
  const [username, setUsername] = useState('');
  const [showCreateTodo, setShowCreateTodo] = useState(false);
  const navigate = useNavigate();

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== '') {
      setShowCreateTodo(true);
      navigate('/create');
    } else {
      alert('Por favor ingresa tu nombre de usuario.');
    }
  };

  return (
    <Router>
      <div className="app-container">
        {!showCreateTodo ? (
          <form onSubmit={handleUsernameSubmit}>
            <label>Introduce tu nombre de usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <button type="submit">Continuar</button>
          </form>
        ) : null}

        <Routes>
          <Route path="/create" element={<CreateTodo username={username} />} />
          <Route path="/show" element={<ShowTodoList />} />
          <Route path="/update/:id" element={<UpdateTodo />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
