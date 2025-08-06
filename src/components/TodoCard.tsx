import { Todo } from "@/app/types/types";
import React from "react";

interface TodoCardProps {
  todo: Todo;
  onChangeStatus: (id: string) => void;
}

const TodoCard = (props: TodoCardProps) => {
  const { todo, onChangeStatus } = props;

  return (
    <div className="flex items-center p-2 border-b">
      <input
        type="checkbox"
        title="status"
        name="status"
        onChange={() => onChangeStatus(todo.id)}
        checked={todo.status}
        className="mr-2"
      />
      <span className={todo.status ? "line-through text-gray-500" : ""}>
        {todo.title}
      </span>
    </div>
  );
};

export default TodoCard;
