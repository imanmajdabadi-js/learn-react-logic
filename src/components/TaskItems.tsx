import type { TaskType } from '../types';
import Task from './Task';

interface TaskItemsPropsItem {
  tasks: TaskType[];
  onDeleteTask: (taskId: string) => void;
  onEdit: (taskId: string) => void;
  onSave: (taskId: string, value: string, draftIsCompleted: boolean) => void;
  onCancel: (taskId: string) => void;
  editingId?: string | null;
}

const TaskItems = ({
  tasks,
  editingId,
  onDeleteTask,
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
            onSave={(value, draftIsCompleted) => onSave(item.taskId, value, draftIsCompleted)}
            onEdit={() => (!editingId ? onEdit(item.taskId) : null)}
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
