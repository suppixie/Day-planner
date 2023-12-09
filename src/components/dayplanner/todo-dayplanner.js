import React from 'react';

function Todolist({ todoItem, addTodos, setTodoItem }) {
  const handleAddTodo = () => {
    if (todoItem) {
      addTodos(todoItem);
    }
  };

  const removeAll = () => {
    setTodoItem([]);
  };

  const handleCopyToClipboard = () => {
    const todoListContent = todoItem.join('\n'); // Join all items in the array

    const textarea = document.createElement('textarea');
    textarea.value = todoListContent;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    alert('Todo List copied to clipboard!');
  };

  return (
    <div className="day-planner-list">
      <h2>Todo List</h2>
      <p>Click the Activities to add them to the list</p>
      <hr />
      <ul>
        {todoItem.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
      <button className="clear-btn" onClick={removeAll}>
        Clear
      </button>
      <button className='copytoclipboardbtn' onClick={handleCopyToClipboard}>Copy</button>
    </div>
  );
}

export default Todolist;
