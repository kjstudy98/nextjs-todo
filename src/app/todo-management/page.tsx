"use client";

import { Todo } from "@/app/types/types";
import TodoCard from "@/components/TodoCard";
import TodoInputArea from "@/components/TodoInputArea";
import { useCallback, useEffect, useMemo, useState } from "react";
import { listTodosPath } from "@/app/utils/constants";

export default function TodoManagement() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = useCallback(async () => {
    try {
      const res = await fetch(listTodosPath);
      if (!res.ok) {
        throw new Error(`Failed to fetch. status=${res.status}`);
      }
      const data = await res.json();
      setTodos(data);
    } catch (e) {
      console.error("Failed to fetch todos:", e);
    } finally {
    }
  }, []);

  const doneTodos = useMemo(() => todos.filter((todo) => todo.status), [todos]);
  const undoneTodos = useMemo(
    () => todos.filter((todo) => !todo.status),
    [todos]
  );

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const onChangeStatus = useCallback((id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, status: !todo.status } : todo
      )
    );
  }, []);

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
              {undoneTodos.length > 0 ? (
                undoneTodos.map((todo) => (
                  <TodoCard
                    todo={todo}
                    onChangeStatus={onChangeStatus}
                    key={todo.id}
                  />
                ))
              ) : (
                <div className="p-4 text-gray-500 text-center">
                  未完了のタスクはありません
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">DONE</h2>
            <div className="bg-green-50 rounded border">
              {doneTodos.length > 0 ? (
                doneTodos.map((todo) => (
                  <TodoCard
                    todo={todo}
                    onChangeStatus={onChangeStatus}
                    key={todo.id}
                  />
                ))
              ) : (
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
