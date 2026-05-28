import type { TaskProps } from '../types';
import Input from './Input';
import TaskActions, { type Mode } from './TaskActions';

interface TaskPropsItem {
  tasks: TaskProps[];
  onDeleteTask: (taskId: string) => void;
  onEdit: () => void;
  mode: Mode;
  onSave: () => void;
}

const Task = ({ tasks, onDeleteTask, onEdit, mode, onSave }: TaskPropsItem) => {
  return (
    <div>
      {tasks?.map((item) => {
        return (
          <div className="flex items-center gap-4 p-4  justify-around" key={item.taskId}>
            {mode === 'edit' ? (
              <Input className="w-32" value="" onChange={() => {}} />
            ) : (
              <p className="text-sm">{item.text}</p>
            )}
            <TaskActions
              onSave={onSave}
              mode={mode}
              onEdit={onEdit}
              onDelete={() => onDeleteTask(item.taskId)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Task;
