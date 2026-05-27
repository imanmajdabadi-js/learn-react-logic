import { useState } from 'react';
import Button from './Button';

interface TaskFormProps {
  onAddTask: (textTask: string) => void;
}

const TaskForm = ({ onAddTask }: TaskFormProps) => {
  const [text, setText] = useState<string>('');

  return (
    <div className="flex flex-col gap-2 mb-3">
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        className="border rounded-md text-center py-1"
        placeholder="write task..."
        type="text"
      />
      <Button
        background="bg-green-600"
        disabled={!text}
        text="Add"
        onClick={() => {
          onAddTask(text);
          setText('');
        }}
      />
    </div>
  );
};

export default TaskForm;
