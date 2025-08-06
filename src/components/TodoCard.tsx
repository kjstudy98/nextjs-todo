import React from "react";

interface TodoCardProps {
  title: string;
  status: boolean;
  onChangeStatus: (title: string) => void;
}

const TodoCard = (props: TodoCardProps) => {
  const { title, status, onChangeStatus } = props;

  return (
    <div className="flex items-center p-2 border-b">
      <input
        type="checkbox"
        title="status"
        name="status"
        onChange={() => onChangeStatus(title)}
        checked={status}
        className="mr-2"
      />
      <span className={status ? "line-through text-gray-500" : ""}>
        {title}
      </span>
    </div>
  );
};

export default TodoCard;
