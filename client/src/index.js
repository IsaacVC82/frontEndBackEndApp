import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Importa el componente principal de tu aplicación
import reportWebVitals from './reportWebVitals'; // Para medición de rendimiento (opcional)
import './App.scss'; 
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza la aplicación
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
