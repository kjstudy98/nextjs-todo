import { TodoTitleOnlySchema } from "@/validation/schema";
import { useState } from "react";

interface TodoInputAreaProps {
  onCreate: () => Promise<void>;
}

const TodoInputArea = ({ onCreate }: TodoInputAreaProps) => {
  const [inputTodo, setInputTodo] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const onChangeInputTodo = (value: string) => {
    setInputTodo(value);
  };

  const onClickAdd = async () => {
    const title = inputTodo.trim();
    const validationResult = TodoTitleOnlySchema.safeParse({
      title,
    });
    if (!validationResult.success) {
      const errorMessages =
        validationResult.error.flatten().fieldErrors.title ?? [];
      setErrors(errorMessages);
      return;
    }
    setErrors([]);
    setInputTodo("");
    // 登録

    //
    await onCreate();
  };

  return (
    <div>
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
    </div>
  );
};

export default TodoInputArea;
