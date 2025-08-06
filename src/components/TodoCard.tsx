import React from "react";

interface TodoCardProps {
  title: string;
  status: boolean;
  onChangeStatus: (title: string) => void;
}

const TodoCard = (props: TodoCardProps) => {
  const { title, status, onChangeStatus } = props;

  return (
    <div>
      <input
        type="checkbox"
        title="status"
        name="status"
        onChange={() => onChangeStatus(title)}
        checked={status}
      />
      {title}
    </div>
  );
};

export default TodoCard;
