import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/todos/')
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const addTodo = todo => {
    if (edit) {
      fetch(`http://localhost:8000/todos/${todo.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      })
        .then(response => response.json())
        .then(updatedTodo => {
          setTodos(prev => prev.map(item => (item.id === updatedTodo.id ? updatedTodo : item)));
          setEdit(null);
        });
    } else {
      fetch('http://localhost:8000/todos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      })
        .then(response => response.json())
        .then(newTodo => setTodos([...todos, newTodo]));
    }
  };

  const toggleComplete = id => {
    const todo = todos.find(todo => todo.id === id);
    fetch(`http://localhost:8000/todos/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...todo, completed: !todo.completed }),
    })
      .then(response => response.json())
      .then(updatedTodo => {
        setTodos(prev => prev.map(todo => (todo.id === id ? updatedTodo : todo)));
      });
  };

  const deleteTodo = id => {
    fetch(`http://localhost:8000/todos/${id}/`, {
      method: 'DELETE',
    }).then(() => {
      setTodos(todos.filter(todo => todo.id !== id));
    });
  };

  const editTodo = id => {
    if (id) {
      const findTodo = todos.find(todo => todo.id === id);
      setEdit(findTodo);
    } else {
      setEdit(null);
    }
  };

  return (
    <div className="app">
      <div className="todo-app">
        <h1>What's the Plan for Today?</h1>
        <TodoForm addTodo={addTodo} edit={edit} setEdit={setEdit} />
        <TodoList 
          todos={todos} 
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo} 
          editTodo={editTodo}
          isEditing={edit ? edit.id : null}
        />
      </div>
    </div>
  );
}

export default App;
