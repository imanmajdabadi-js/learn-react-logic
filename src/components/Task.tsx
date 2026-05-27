import type { TaskProps } from '../types';
import TaskActions from './TaskActions';

interface TaskPropsItem {
  tasks: TaskProps[];
  onDeleteTask: (taskId: string) => void;
}

const Task = ({ tasks, onDeleteTask }: TaskPropsItem) => {
  return (
    <div>
      {tasks?.map((item) => {
        return (
          <div className="flex items-center gap-4 p-4 w-64" key={item.taskId}>
            <p className="text-sm">{item.text}</p>
            <TaskActions onDelete={() => onDeleteTask(item.taskId)} />
          </div>
        );
      })}
    </div>
  );
};

export default Task;
