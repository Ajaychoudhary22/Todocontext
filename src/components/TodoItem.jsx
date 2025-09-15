import React, { useState } from "react";
import { useTodo } from "../contexts/TodoContext.js";

const TodoItem = ({ todo }) => {
  const [isTodoEditing, setIsTodoEditing] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditing(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex items-center justify-between gap-3 p-4 rounded-xl shadow-md border border-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        todo.completed ? "bg-green-500/20" : "bg-white/5"
      }`}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        className="w-5 h-5 cursor-pointer accent-green-500"
        checked={todo.completed}
        onChange={toggleCompleted}
      />

      {/* Todo Message */}
      <input
        type="text"
        value={todoMsg}
        readOnly={!isTodoEditing}
        onChange={(e) => setTodoMsg(e.target.value)}
        className={`flex-1 bg-transparent outline-none text-white ${
          todo.completed ? "line-through opacity-60" : ""
        } ${isTodoEditing ? "border-b border-blue-400 px-1" : ""}`}
      />

      {/* Edit / Save Button */}
      <button
        className="px-3 py-1 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:scale-105 transition-transform disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditing) {
            editTodo();
          } else setIsTodoEditing((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditing ? "Save" : "Edit"}
      </button>

      {/* Delete Button */}
      <button
        className="px-3 py-1 rounded-lg bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-md hover:scale-105 transition-transform"
        onClick={() => deleteTodo(todo.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
