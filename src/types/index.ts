export interface TaskProps {
  taskId: string;
  text: string;
  isCompleted: boolean;
  mode: Mode;
}

export type Mode = 'edit' | 'view';

export interface Tasks {
  tasks: TaskProps[];
}

export interface TaskListProps {
  category: string;
  id: string;
  tasks: TaskProps[];
}
