import { useState } from 'react';
import type { Mode } from '../types';
import TaskActions from './TaskActions';
import TaskTitle from './TaskTitle';

interface Props {
  text: string;
  mode: Mode;
  isCompleted: boolean;
  onToggleCompledted: () => void;
  onCancel: () => void;
  onSave: (value: string) => void;
  onEdit: () => void;
  onDeleteTask: () => void;
}
const Task = ({
  isCompleted,
  text,
  mode,
  onCancel,
  onDeleteTask,
  onEdit,
  onSave,
  onToggleCompledted,
}: Props) => {
  const [draft, setDraft] = useState<string>(text);

  return (
    <div className="flex items-center gap-4 p-4  justify-around">
      <TaskTitle onChange={(e) => setDraft(e.target.value)} text={draft} mode={mode} />
      <TaskActions
        isCompleted={isCompleted}
        onToggleCompledtedd={() => onToggleCompledted()}
        onCancel={() => onCancel()}
        onSave={() => onSave(draft)}
        mode={mode}
        onEdit={() => onEdit()}
        onDelete={() => onDeleteTask()}
      />
    </div>
  );
};

export default Task;
