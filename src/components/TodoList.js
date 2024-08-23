import React from 'react';
import TodoItem from './TodoItem';
import '../App.css'


const TodoList = ({ todos, toggleComplete, deleteTodo, editTodo, isEditing }) => {
    return (
      <div className="todo-list">
        {todos.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            toggleComplete={toggleComplete} 
            deleteTodo={deleteTodo} 
            editTodo={editTodo}
            isEditing={isEditing === todo.id}  // Compare current task ID with isEditing
          />
        ))}
      </div>
    );
  };
  
  export default TodoList;