import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const TodoCalendar = ({ selectedDate, setSelectedDate }) => {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const apiKey = process.env.REACT_APP_CALENDARIFIC_API_KEY; 
        const response = await axios.get('https://calendarific.com/api/v2/holidays', {
          params: {
            api_key: apiKey,
            country: 'MX',
            year: 2025,
          },
        });

        console.log('Días festivos obtenidos:', response.data.response.holidays);
        setHolidays(response.data.response.holidays || []);
      } catch (error) {
        console.error('Error al obtener los días festivos:', error);
      }
    };

    fetchHolidays();
  }, []);

  const getTileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0]; // Asegurar formato YYYY-MM-DD
      return holidays.some((holiday) => holiday.date.iso === dateStr) ? 'holiday' : '';
    }
    return '';
  };

  return (
    <div>
      <h2>Selecciona una fecha</h2>
      <Calendar
        onChange={(date) => setSelectedDate(date)} // Se mantiene la fecha como Date
        value={selectedDate || new Date()} // Si no hay fecha seleccionada, usar la actual
        tileClassName={getTileClassName} // Aplica clases a días festivos
      />
      <p>Fecha seleccionada: {selectedDate ? selectedDate.toDateString() : 'Ninguna'}</p>
    </div>
  );
};

export default TodoCalendar;

