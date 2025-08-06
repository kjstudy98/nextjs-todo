import { Todo } from "@/app/types/types";
import React from "react";

interface TodoCardProps {
  todo: Todo;
  onChangeStatus: (id: string) => void;
}

const TodoCard = (props: TodoCardProps) => {
  const { todo, onChangeStatus } = props;

  return (
    <div className="flex items-center p-3 hover:bg-gray-100 transition-colors">
      <input
        type="checkbox"
        title="status"
        name="status"
        onChange={() => onChangeStatus(todo.id)}
        checked={todo.status}
        className="mr-3 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
      />
      <span
        className={`flex-1 ${
          todo.status ? "line-through text-gray-500" : "text-gray-800"
        }`}
      >
        {todo.title}
      </span>
    </div>
  );
};

export default TodoCard;
