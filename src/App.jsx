import React, { useEffect, useState } from "react";
import { TodoProvider } from "./contexts/TodoContext.js";
import { TodoForm, TodoItem } from "./components/index.js";

const App = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === todo.id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-slate-900 to-slate-950 p-6">
        <h1 className="text-3xl font-bold text-white drop-shadow mb-6 animate-fade-in">
          📝 Todo App
        </h1>
        <div className="w-full max-w-xl space-y-3">
          <TodoForm />
          {todos.map((todo) => (
            <div key={todo.id} className="animate-slide-up">
              <TodoItem todo={todo} />
            </div>
          ))}
        </div>
      </div>
    </TodoProvider>
  );
};

export default App;
