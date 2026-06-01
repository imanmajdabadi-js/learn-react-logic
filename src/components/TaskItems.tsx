import type { TaskType } from '../types';
import Task from './Task';

interface TaskItemsPropsItem {
  tasks: TaskType[];
  onDeleteTask: (taskId: string) => void;
  onEdit: (taskId: string) => void;
  onSave: (taskId: string, value: string) => void;
  onCancel: (taskId: string) => void;
  onToggleCompledted: (taskId: string) => void;
}

const TaskItems = ({
  tasks,
  onDeleteTask,
  onToggleCompledted,
  onEdit,
  onSave,
  onCancel,
}: TaskItemsPropsItem) => {
  return (
    <div>
      {tasks?.map((item) => {
        return (
          <Task
            key={item.taskId}
            text={item.text}
            onToggleCompledted={() => onToggleCompledted(item.taskId)}
            onSave={(value) => onSave(item.taskId, value)}
            onEdit={() => onEdit(item.taskId)}
            isCompleted={item.isCompleted}
            mode={item.mode}
            onCancel={() => onCancel(item.taskId)}
            onDeleteTask={() => onDeleteTask(item.taskId)}
          />
        );
      })}
    </div>
  );
};

export default TaskItems;
