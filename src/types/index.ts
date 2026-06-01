export interface TaskType {
  taskId: string;
  text: string;
  isCompleted: boolean;
  mode: Mode;
}

export type Mode = 'edit' | 'view';

export interface Tasks {
  tasks: TaskType[];
}

export interface CategoryType {
  category: string;
  id: string;
  tasks: TaskType[];
}

export interface TaskWithoutMode {
  taskId: string;
  isCompleted: boolean;
  text: string;
}

export interface CategoryWithoutMode {
  category: string;
  id: string;
  tasks: Omit<TaskType, 'mode'>[];
}
