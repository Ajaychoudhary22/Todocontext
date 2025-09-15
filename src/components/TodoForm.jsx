import React, { useState } from "react";
import { useTodo } from "../contexts/TodoContext.js";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({ todo, completed: false });
    setTodo("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 p-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-lg"
    >
      <input
        type="text"
        placeholder="Add a new todo..."
        className="flex-1 px-4 py-2 rounded-lg bg-transparent text-white placeholder-gray-400 border border-white/20 focus:border-blue-400 outline-none"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:scale-105 transition-transform"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;
