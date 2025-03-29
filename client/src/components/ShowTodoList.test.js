import { render, screen, fireEvent } from '@testing-library/react';
import ShowTodoList from './showTodoList';
import axios from 'axios';

// Mock de axios y fetchTodos
jest.mock('axios');
const fetchTodos = jest.fn();

const todos = [
  {
    _id: '1',
    title: 'Test Task 1',
    description: 'Test Description 1',
    date: '2025-02-26',
    priority: 'Alta',
    done: false,
  },
  {
    _id: '2',
    title: 'Test Task 2',
    description: 'Test Description 2',
    date: '2025-02-27',
    priority: 'Media',
    done: true,
  },
];

describe('ShowTodoList', () => {
  beforeEach(() => {
    render(<ShowTodoList todos={todos} fetchTodos={fetchTodos} />);
  });

  test('debe renderizar la lista de tareas correctamente', () => {
    expect(screen.getByText(/Lista de Tareas/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Task 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Task 2/i)).toBeInTheDocument();
  });

  test('debe eliminar una tarea al hacer clic en el botón Eliminar', async () => {
    axios.delete.mockResolvedValueOnce({}); // Simula respuesta exitosa al eliminar

    fireEvent.click(screen.getAllByText(/Eliminar/i)[0]);

    expect(axios.delete).toHaveBeenCalledWith('');
    expect(fetchTodos).toHaveBeenCalledTimes(1);
  });
});
