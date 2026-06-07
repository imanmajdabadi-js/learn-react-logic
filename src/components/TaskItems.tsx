import type { TaskProps } from '../types';
import Task from './Task';

interface TaskItemsPropsItem {
  tasks: TaskProps[];
  onDeleteTask: (taskId: string) => void;
  onEdit: (taskId: string) => void;
  onSave: (taskId: string, value: string, draftIsCompleted: boolean) => void;
  onCancel: (taskId: string) => void;
  onToggleCompledted: (taskId: string) => void;
  editingId: string | null;
}

const TaskItems = ({
  tasks,
  onDeleteTask,
  onToggleCompledted,
  onEdit,
  editingId,
  onSave,
  onCancel,
}: TaskItemsPropsItem) => {
  return (
    <div>
      {tasks?.map((item) => {
        const isEditing = item.taskId === editingId;
        return (
          <Task
            key={item.taskId}
            text={item.text}
            onToggleCompledted={() => onToggleCompledted(item.taskId)}
            onSave={(value, draftIsCompleted) => onSave(item.taskId, value, draftIsCompleted)}
            onEdit={() => onEdit(item.taskId)}
            isCompleted={item.isCompleted}
            mode={isEditing ? 'edit' : 'view'}
            onCancel={() => onCancel(item.taskId)}
            onDeleteTask={() => onDeleteTask(item.taskId)}
          />
        );
      })}
    </div>
  );
};

export default TaskItems;
