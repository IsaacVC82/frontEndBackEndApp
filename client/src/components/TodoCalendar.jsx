import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const TodoCalendar = ({ selectedDate, setSelectedDate }) => {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const apiKey = process.env.CALENDARIFIC_API_KEY; 
        const response = await axios.get('https://calendarific.com/api/v2/holidays', {
          params: {
            api_key: apiKey,
            country: 'MX',
            year: 2025,
          },
        });
        setHolidays(response.data.response.holidays || []);
      } catch (error) {
        console.error('Error al obtener los días festivos:', error);
      }
    };

    fetchHolidays();
  }, []);

  const getTileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0]; // Formato yyyy-mm-dd
      return holidays.some((holiday) => holiday.date.iso === dateStr) ? 'holiday' : '';
    }
    return '';
  };

  return (
    <div>
      <h2>Selecciona una fecha</h2>
      <Calendar
        onChange={(date) => setSelectedDate(new Date(date))} 
        value={selectedDate ? new Date(selectedDate) : new Date()}
        tileClassName={getTileClassName}
      />
      <p>Fecha seleccionada: {selectedDate ? new Date(selectedDate).toDateString() : 'Ninguna'}</p>
    </div>
  );
};

export default TodoCalendar;
