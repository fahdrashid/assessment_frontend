import React, { useState, useEffect } from 'react';
import '../App.css'


const TodoForm = ({ addTodo, edit, setEdit }) => {
    const [input, setInput] = useState('');
  
    useEffect(() => {
      if (edit) {
        setInput(edit.title);
      } else {
        setInput('');
      }
    }, [edit]);
  
    const handleSubmit = e => {
      e.preventDefault();
  
      if (!input) return;
  
      if (edit) {
        addTodo({
          id: edit.id,
          title: input,
          completed: false,
        });
        setEdit(null);
      } else {
        addTodo({
          id: Math.floor(Math.random() * 10000),
          title: input,
          completed: false,
        });
      }
  
      setInput('');
    };
  
    return (
      <form onSubmit={handleSubmit} className="todo-form">
        <input 
          type="text" 
          placeholder="Add a task" 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          className="todo-input"
        />
        <button className="todo-button">
          {edit ? 'Update Task' : 'Add Task'}
        </button>
      </form>
    );
  };
  
  export default TodoForm;