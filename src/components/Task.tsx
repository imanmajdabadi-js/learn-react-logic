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
  console.log(text);

  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/set-state-in-effect
  //   setDraft(text);
  // }, [text, mode]);

  const handleCancel = () => {
    onCancel();
    setDraft(text);
  };

  return (
    <div className="flex items-center gap-4 p-4  justify-around">
      <TaskTitle
        onChange={(e) => setDraft(e.target.value)}
        text={mode === 'edit' ? draft : text}
        mode={mode}
      />
      <TaskActions
        isCompleted={isCompleted}
        onToggleCompledtedd={() => onToggleCompledted()}
        onCancel={handleCancel}
        onSave={() => onSave(draft)}
        mode={mode}
        onEdit={() => onEdit()}
        onDelete={() => onDeleteTask()}
      />
    </div>
  );
};

export default Task;
