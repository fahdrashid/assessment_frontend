import React from 'react';
import '../App.css'


const TodoItem = ({ todo, toggleComplete, deleteTodo, editTodo, isEditing }) => {
    return (
      <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
        <input 
          type="checkbox" 
          checked={todo.completed} 
          onChange={() => toggleComplete(todo.id)} 
        />
        <span>{todo.title}</span>
        <div>
          {isEditing ? (
            <button onClick={() => editTodo(null)}>Cancel</button>
          ) : (
            <button onClick={() => editTodo(todo.id)}>Edit</button>
          )}
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      </div>
    );
  };
  
  export default TodoItem;