"use client";

import TodoCard from "@/components/TodoCard";
import { TodoTitleOnlySchema } from "@/validation/schema";
import { useState } from "react";
import { Todo } from "@/app/types/types";

const sampleTodos: Todo[] = [
  { id: "001", title: "TODO1", status: false },
  { id: "002", title: "TODO2", status: false },
  { id: "003", title: "TODO3", status: true },
  { id: "004", title: "TODO4", status: true },
];

export default function TodoManagement() {
  const [todos, setTodos] = useState(sampleTodos);
  const [inputTodo, setInputTodo] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const onChangeInputTodo = (value: string) => {
    setInputTodo(value);
  };

  const onClickAdd = () => {
    const result = TodoTitleOnlySchema.safeParse({
      title: inputTodo.trim(),
    });
    if (!result.success) {
      const errorMessages = result.error.flatten().fieldErrors.title ?? [];
      setErrors(errorMessages);
      return;
    }
    setErrors([]);

    const newTodo: Todo = {
      id: self.crypto.randomUUID(),
      title: inputTodo.trim(),
      status: false,
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setInputTodo("");
  };

  const onChangeStatus = (id: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: !todo.status };
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
        {errors.length ? (
          <div style={{ color: "red", marginBottom: 8 }}>
            {errors.map((e, idx) => (
              <div key={idx}>{e}</div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="mb-4">
        <p className="font-bold">TODO</p>
        {todos
          .filter((todo) => !todo.status)
          .map((todo) => (
            <TodoCard
              todo={todo}
              onChangeStatus={onChangeStatus}
              key={todo.id}
            />
          ))}
      </div>

      <div className="mb-4">
        <p className="font-bold">DONE</p>
        {todos
          .filter((todo) => todo.status)
          .map((todo) => (
            <TodoCard
              todo={todo}
              onChangeStatus={onChangeStatus}
              key={todo.id}
            />
          ))}
      </div>
    </div>
  );
}
