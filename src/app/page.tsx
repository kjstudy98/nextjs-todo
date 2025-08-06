"use client";

import TodoCard from "@/components/TodoCard";
import { useState } from "react";

interface Todo {
  id: string;
  title: string;
  status: boolean;
}

const sampleTodos: Todo[] = [
  { id: "001", title: "TODO1", status: false },
  { id: "002", title: "TODO2", status: false },
  { id: "003", title: "TODO3", status: true },
  { id: "004", title: "TODO4", status: true },
];

export default function TodoManagement() {
  const [todos, setTodos] = useState(sampleTodos);
  const [inputTodo, setInputTodo] = useState("");

  const onChangeInputTodo = (value: string) => {
    setInputTodo(value);
  };

  const onClickAdd = () => {
    // TODO: 空白の場合にバリデーションで弾く

    const newTodo: Todo = {
      id: self.crypto.randomUUID(),
      title: inputTodo.trim(),
      status: false,
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setInputTodo("");
  };

  const onChangeStatus = (title: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.title === title) {
        return { id: todo.id, title: todo.title, status: !todo.status };
      } else {
        return todo;
      }
    });
    setTodos(newTodos);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">TODOアプリ</h1>
      <div className="mb-4">
        <input
          type="text"
          title="todo"
          name="todo"
          value={inputTodo}
          onChange={(e) => onChangeInputTodo(e.target.value)}
          className="border p-2 mr-2"
          placeholder="新しいTODO"
        />
        <button
          onClick={onClickAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          追加
        </button>
      </div>

      <div className="mb-4">
        <p className="font-bold">TODO</p>
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

      <div className="mb-4">
        <p className="font-bold">DONE</p>
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
