import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { MdCancel } from 'react-icons/md';
import type { Mode } from '../types';
import Button from './Button';

interface TaskActionsProps {
  isCompleted: boolean;
  onDelete: () => void;
  onEdit: () => void;
  mode: Mode;
  onSave: () => void;
  onCancel: () => void;
  onToggleCompledtedd: () => void;
}

const TaskActions = ({
  isCompleted,
  onDelete,
  onEdit,
  onToggleCompledtedd,
  mode,
  onSave,
  onCancel,
}: TaskActionsProps) => {
  return (
    <div className="flex items-center gap-4">
      {mode === 'edit' ? (
        <Button text="Save" background="bg-blue-400" onClick={onSave} />
      ) : (
        <FaEdit onClick={onEdit} className="cursor-pointer" size={18} color="gray" />
      )}
      {isCompleted ? (
        <ImCheckboxChecked
          onClick={onToggleCompledtedd}
          className="cursor-pointer"
          size={18}
          color="green"
        />
      ) : (
        <ImCheckboxUnchecked
          onClick={onToggleCompledtedd}
          className="cursor-pointer"
          size={18}
          color="green"
        />
      )}
      <FaDeleteLeft onClick={() => onDelete()} className="cursor-pointer" size={18} color="red" />
      <MdCancel className="cursor-pointer" onClick={onCancel} size={18} color="blue" />
    </div>
  );
};

export default TaskActions;
