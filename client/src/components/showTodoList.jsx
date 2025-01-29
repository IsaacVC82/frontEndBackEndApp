const ShowTodoList = ({ todos }) => {
  console.log("Tareas en ShowTodoList:", todos); 

  return (
    <div>
      <h2>Lista de Tareas</h2>
      <ul>
        {todos.length === 0 ? (
          <p>No hay tareas disponibles.</p>
        ) : (
          todos.map((todo) => (
            <li key={todo._id}>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <p>{todo.priority}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ShowTodoList;

