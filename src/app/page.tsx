"use client";

import TodoCard from "@/components/TodoCard";
import { useState } from "react";

const sampleTodos = [
  { title: "TODO1", status: false },
  { title: "TODO2", status: false },
  { title: "TODO3", status: true },
  { title: "TODO4", status: true },
];

export default function TodoManagement() {
  const [todos, setTodos] = useState(sampleTodos);
  const [inputTodo, setInputTodo] = useState("");

  const onChangeInputTodo = (value: string) => {
    setInputTodo(value);
  };

  const onClickAdd = () => {
    const newTodos = [...todos];
    newTodos.push({ title: inputTodo, status: false });
    console.log({ newTodos });
    setTodos(newTodos);
  };

  const onChangeStatus = (title: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.title === title) {
        return { title: todo.title, status: !todo.status };
      } else {
        return todo;
      }
    });
    setTodos(newTodos);
  };

  return (
    <div>
      <h1>TODOアプリ</h1>
      <div className="py-4">
        <input
          type="text"
          title="todo"
          name="todo"
          value={inputTodo}
          onChange={(e) => onChangeInputTodo(e.target.value)}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>

      <div className="py-4">
        <p>TODO</p>
        {todos
          .filter((todo) => !todo.status)
          .map((todo, idx) => (
            <TodoCard
              title={todo.title}
              onChangeStatus={onChangeStatus}
              key={idx}
              status={todo.status}
            />
          ))}
      </div>

      <div className="py-4">
        <p>DONE</p>
        {todos
          .filter((todo) => todo.status)
          .map((todo, idx) => (
            <TodoCard
              title={todo.title}
              onChangeStatus={onChangeStatus}
              key={idx}
              status={todo.status}
            />
          ))}
      </div>
    </div>
  );
}
