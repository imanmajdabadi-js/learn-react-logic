export interface TaskProps {
  taskId: string;
  text: string;
  isCompleted: boolean;
}

export interface Tasks {
  tasks: TaskProps[];
}

export interface TaskListProps {
  category: string;
  id: string;
  tasks: TaskProps[];
}
