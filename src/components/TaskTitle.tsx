import type { ChangeEvent } from 'react';
import type { Mode } from '../types';
import Input from './Input';

interface Props {
  mode: Mode;
  text: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const TaskTitle = ({ mode, text, onChange }: Props) => {
  return (
    <div>
      {mode === 'edit' ? (
        <Input className="w-32" value={text} onChange={onChange} />
      ) : (
        <p className="text-sm">{text}</p>
      )}
    </div>
  );
};

export default TaskTitle;
