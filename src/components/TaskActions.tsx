import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';

interface TaskActionsProps {
  isCompleted?: boolean;
  onDelete: () => void;
}

const TaskActions = ({ isCompleted, onDelete }: TaskActionsProps) => {
  return (
    <div className="flex items-center gap-4">
      <FaEdit className="cursor-pointer" size={18} color="gray" />
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
