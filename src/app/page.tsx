"use client";

import { Todo } from "@/app/types/types";
import TodoCard from "@/components/TodoCard";
import TodoInputArea from "@/components/TodoInputArea";
import { useCallback, useEffect, useState } from "react";
import { listTodosPath } from "./utils/constants";

export default function TodoManagement() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = useCallback(async () => {
    try {
      const res = await fetch(listTodosPath);
      const data = await res.json();
      setTodos(data);
    } catch (e) {
      console.error("Failed to fetch todos:", e);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

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

        <TodoInputArea onCreate={fetchTodos} />

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
