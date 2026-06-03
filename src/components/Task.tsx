import { useState } from 'react';
import TaskActions from './TaskActions';
import TaskTitle from './TaskTitle';

interface Props {
  text: string;
  isEditing: boolean;
  isCompleted: boolean;
  onToggleCompledted: () => void;
  onCancel: () => void;
  onSave: (value: string, draftIsCompleted: boolean) => void;
  onEdit: () => void;
  onDeleteTask: () => void;
}
const Task = ({ isCompleted, text, isEditing, onCancel, onDeleteTask, onEdit, onSave }: Props) => {
  const [draft, setDraft] = useState<string>(text);
  const [draftIsCompleted, setDraftIsCompleted] = useState<boolean>(isCompleted);

  const handleCancel = () => {
    onCancel();
    setDraft(text);
    setDraftIsCompleted(isCompleted);
  };

  const handleCompleted = () => {
    setDraftIsCompleted((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-4 p-4  justify-around">
      <TaskTitle
        onChange={(e) => setDraft(e.target.value)}
        text={isEditing ? draft : text}
        isEditing={isEditing}
      />
      <TaskActions
        isCompleted={isEditing ? draftIsCompleted : isCompleted}
        onToggleCompledtedd={handleCompleted}
        onCancel={handleCancel}
        onSave={() => onSave(draft, draftIsCompleted)}
        isEditing={isEditing}
        onEdit={() => onEdit()}
        onDelete={() => onDeleteTask()}
      />
    </div>
  );
};

export default Task;
