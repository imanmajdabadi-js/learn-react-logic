import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import Button from './Button';

export type Mode = 'edit' | 'save' | '';

interface TaskActionsProps {
  isCompleted?: boolean;
  onDelete: () => void;
  onEdit: () => void;
  mode: Mode;
  onSave: () => void;
}

const TaskActions = ({ isCompleted, onDelete, onEdit, mode, onSave }: TaskActionsProps) => {
  return (
    <div className="flex items-center gap-4">
      {mode === 'edit' ? (
        <Button disabled text="Save" background="bg-blue-400" onClick={onSave} />
      ) : (
        <FaEdit onClick={onEdit} className="cursor-pointer" size={18} color="gray" />
      )}
      {isCompleted ? (
        <ImCheckboxChecked className="cursor-pointer" size={18} color="green" />
      ) : (
        <ImCheckboxUnchecked className="cursor-pointer" size={18} color="green" />
      )}
      <FaDeleteLeft onClick={() => onDelete()} className="cursor-pointer" size={18} color="red" />
    </div>
  );
};

export default TaskActions;
