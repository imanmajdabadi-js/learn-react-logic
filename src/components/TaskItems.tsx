import type { TaskProps } from '../types';
import Input from './Input';
import TaskActions from './TaskActions';

interface TaskItemsPropsItem {
  tasks: TaskProps[];
  onDeleteTask: (taskId: string) => void;
  onEdit: (taskId: string) => void;
  onSave: () => void;
}

const TaskItems = ({ tasks, onDeleteTask, onEdit, onSave }: TaskItemsPropsItem) => {
  return (
    <div>
      {tasks?.map((item) => {
        return (
          <div className="flex items-center gap-4 p-4  justify-around" key={item.taskId}>
            {item.mode === 'edit' ? (
              <Input className="w-32" value="" onChange={() => {}} />
            ) : (
              <p className="text-sm">{item.text}</p>
            )}
            <TaskActions
              onSave={onSave}
              mode={item.mode}
              onEdit={() => onEdit(item.taskId)}
              onDelete={() => onDeleteTask(item.taskId)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TaskItems;
