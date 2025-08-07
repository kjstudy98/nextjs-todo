"use client";

import TodoCard from "@/components/TodoCard";
import { TodoTitleOnlySchema } from "@/validation/schema";
import { useCallback, useEffect, useState } from "react";
import { Todo } from "@/app/types/types";

export default function TodoManagement() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputTodo, setInputTodo] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  // TODOリスト取得
  const fetchTodos = useCallback(async () => {
    try {
      const res = await fetch("/api/todos");
      const data = await res.json();
      setTodos(data);
    } catch (e) {
      console.error("Failed to fetch todos:", e);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const onChangeInputTodo = (value: string) => {
    setInputTodo(value);
  };

  const onClickAdd = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const result = TodoTitleOnlySchema.safeParse({
      title,
    });
    if (!result.success) {
      const errorMessages = result.error.flatten().fieldErrors.title ?? [];
      setErrors(errorMessages);
      return;
    }
    setErrors([]);
    setInputTodo("");

    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    fetchTodos();
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          TODOアプリ
        </h1>

        <form action={onClickAdd}>
          <div className="mb-6">
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                title="title"
                name="title"
                value={inputTodo}
                onChange={(e) => onChangeInputTodo(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                placeholder="新しいTODO"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
              >
                追加
              </button>
            </div>
            {errors.length > 0 && (
              <div className="text-red-500 text-sm">
                {errors.map((e, idx) => (
                  <div key={idx}>{e}</div>
                ))}
              </div>
            )}
          </div>
        </form>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">TODO</h2>
            <div className="bg-gray-50 rounded border">
              {todos
                .filter((todo) => !todo.status)
                .map((todo) => (
                  <TodoCard
                    todo={todo}
                    onChangeStatus={onChangeStatus}
                    key={todo.id}
                  />
                ))}
              {todos.filter((todo) => !todo.status).length === 0 && (
                <div className="p-4 text-gray-500 text-center">
                  完了済みのタスクはありません
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">DONE</h2>
            <div className="bg-green-50 rounded border">
              {todos
                .filter((todo) => todo.status)
                .map((todo) => (
                  <TodoCard
                    todo={todo}
                    onChangeStatus={onChangeStatus}
                    key={todo.id}
                  />
                ))}
              {todos.filter((todo) => todo.status).length === 0 && (
                <div className="p-4 text-gray-500 text-center">
                  完了したタスクはありません
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
