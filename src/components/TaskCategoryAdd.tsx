import { useState } from 'react';
import Button from './Button';

interface TaskFormProps {
  onAddCategoryTask: (CategoryText: string) => void;
}

const TaskCategoryAdd = ({ onAddCategoryTask }: TaskFormProps) => {
  const [text, setText] = useState<string>('');

  return (
    <div className="flex flex-col gap-2 mb-3 w-64 mx-auto relative top-40">
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        className="border rounded-md text-center py-1"
        placeholder="write task..."
        type="text"
      />
      <Button
        background="bg-amber-500"
        disabled={!text}
        text="Add"
        onClick={() => {
          {
            onAddCategoryTask(text);
            setText('');
          }
        }}
      />
    </div>
  );
};

export default TaskCategoryAdd;
