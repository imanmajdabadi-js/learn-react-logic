import type { ChangeEvent } from 'react';
import Input from './Input';

interface Props {
  isEditing: boolean;
  text: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const TaskTitle = ({ text, onChange, isEditing }: Props) => {
  return (
    <div>
      {isEditing ? (
        <Input className="w-32" value={text} onChange={onChange} />
      ) : (
        <p className="text-sm">{text}</p>
      )}
    </div>
  );
};

export default TaskTitle;
