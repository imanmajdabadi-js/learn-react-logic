import type { TaskProps } from '../types';
import Input from './Input';
import TaskActions from './TaskActions';

interface TaskItemsPropsItem {
  tasks: TaskProps[];
  onDeleteTask: (taskId: string) => void;
  onEdit: (taskId: string) => void;
  onSave: (taskId: string) => void;
  onInputChange: (value: string, taskId: string) => void;
  onCancel: (taskId: string) => void;
  onToggleCompledtedd: (taskId: string) => void;
}

const TaskItems = ({
  tasks,
  onDeleteTask,
  onToggleCompledtedd,
  onEdit,
  onSave,
  onInputChange,
  onCancel,
}: TaskItemsPropsItem) => {
  return (
    <div>
      {tasks?.map((item) => {
        return (
          <div className="flex items-center gap-4 p-4  justify-around" key={item.taskId}>
            {item.mode === 'edit' ? (
              <Input
                className="w-32"
                value={item.text}
                onChange={(e) => onInputChange(e.target.value, item.taskId)}
              />
            ) : (
              <p className="text-sm">{item.text}</p>
            )}
            <TaskActions
              isCompleted={item.isCompleted}
              onToggleCompledtedd={() => onToggleCompledtedd(item.taskId)}
              onCancel={() => onCancel(item.taskId)}
              onSave={() => onSave(item.taskId)}
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
