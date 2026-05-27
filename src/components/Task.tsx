import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import type { Tasks } from '../types';

const Task = ({ task }: Tasks) => {
  return (
    <div>
      {task?.map((item) => {
        return (
          <div className="flex items-center gap-4 p-4 w-64" key={item.taskId}>
            <p className="text-sm">{item.text}</p>
            <FaEdit className="cursor-pointer" size={18} color="gray" />
            {item.isCompleted ? (
              <ImCheckboxChecked className="cursor-pointer" size={18} color="green" />
            ) : (
              <ImCheckboxUnchecked className="cursor-pointer" size={18} color="green" />
            )}
            <FaDeleteLeft className="cursor-pointer" size={18} color="red" />
          </div>
        );
      })}
    </div>
  );
};

export default Task;
