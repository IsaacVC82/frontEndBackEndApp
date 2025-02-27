import { render, screen, fireEvent } from '@testing-library/react';
import CreateTodo from './createTodo';

// Mock de la función handleAddTodo
const handleAddTodo = jest.fn();

describe('CreateTodo', () => {
  beforeEach(() => {
    render(<CreateTodo handleAddTodo={handleAddTodo} />);
  });

  test('debe renderizar el formulario correctamente', () => {
    expect(screen.getByLabelText(/Título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fecha/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Prioridad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Hecho/i)).toBeInTheDocument();
  });

  test('debe llamar a handleAddTodo cuando se envíe el formulario', () => {
    fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'Test Task' } });
    fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: 'Test description' } });
    fireEvent.change(screen.getByLabelText(/Fecha/i), { target: { value: '2025-02-26' } });
    fireEvent.change(screen.getByLabelText(/Prioridad/i), { target: { value: 'Alta' } });

    fireEvent.click(screen.getByText(/Crear Tarea/i));

    expect(handleAddTodo).toHaveBeenCalledTimes(1);
    expect(handleAddTodo).toHaveBeenCalledWith({
      title: 'Test Task',
      description: 'Test description',
      date: '2025-02-26',
      priority: 'Alta',
      done: false,
    });
  });
});
