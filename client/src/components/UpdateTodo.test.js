import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UpdateTodo from './updateTodo';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Mock de axios
jest.mock('axios');

const mockFetchTodos = jest.fn();

describe('UpdateTodo', () => {
  const todo = {
    _id: '1',
    title: 'Test Task 1',
    description: 'Test Description 1',
    date: '2025-02-26',
    priority: 'Alta',
    done: false,
  };

  beforeEach(() => {
    axios.get.mockResolvedValueOnce({ data: todo });

    render(
      <MemoryRouter initialEntries={['/update/1']}>
        <Routes>
          <Route path="/update/:id" element={<UpdateTodo fetchTodos={mockFetchTodos} />} />
        </Routes>
      </MemoryRouter>
    );
  });

  test('debe cargar y mostrar los datos de la tarea correctamente', async () => {
    await waitFor(() => screen.getByLabelText(/Título/i));
    
    expect(screen.getByLabelText(/Título/i).value).toBe(todo.title);
    expect(screen.getByLabelText(/Descripción/i).value).toBe(todo.description);
    expect(screen.getByLabelText(/Fecha/i).value).toBe(todo.date);
    expect(screen.getByLabelText(/Prioridad/i).value).toBe(todo.priority);
  });

  test('debe actualizar la tarea cuando se envíe el formulario', async () => {
    await waitFor(() => screen.getByLabelText(/Título/i));

    fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'Updated Task' } });
    fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: 'Updated description' } });

    fireEvent.click(screen.getByText(/Actualizar Tarea/i));

    expect(axios.put).toHaveBeenCalledWith('http://localhost:8000/api/todo/1', {
      ...todo,
      title: 'Updated Task',
      description: 'Updated description',
    });
    expect(mockFetchTodos).toHaveBeenCalledTimes(1);
  });
});
