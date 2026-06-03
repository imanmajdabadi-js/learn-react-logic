import { useState } from 'react';
import type { Mode } from '../types';
import TaskActions from './TaskActions';
import TaskTitle from './TaskTitle';

interface Props {
  text: string;
  mode: Mode;
  isCompleted: boolean;
  onCancel: () => void;
  onSave: (value: string, draftIsCompleted: boolean) => void;
  onEdit: () => void;
  onDeleteTask: () => void;
}
const Task = ({ isCompleted, text, mode, onCancel, onDeleteTask, onEdit, onSave }: Props) => {
  const [draft, setDraft] = useState<string>(text);
  const [draftIsCompleted, setDraftIsCompleted] = useState<boolean>(isCompleted);

  const handleCancel = () => {
    onCancel();
    setDraft(text);
    setDraftIsCompleted(isCompleted);
  };

  const handleToggle = () => {
    if (mode === 'edit') {
      setDraftIsCompleted((prev) => !prev);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4  justify-around">
      <TaskTitle
        onChange={(e) => setDraft(e.target.value)}
        text={mode === 'edit' ? draft : text}
        mode={mode}
      />
      <TaskActions
        isCompleted={mode === 'edit' ? draftIsCompleted : isCompleted}
        onToggleCompledted={handleToggle}
        onCancel={handleCancel}
        onSave={() => onSave(draft, draftIsCompleted)}
        mode={mode}
        onEdit={() => onEdit()}
        onDelete={() => onDeleteTask()}
      />
    </div>
  );
};

export default Task;
