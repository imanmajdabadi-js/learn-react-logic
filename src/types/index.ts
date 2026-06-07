export interface TaskProps {
  taskId: string;
  text: string;
  isCompleted: boolean;
}

export type Mode = 'edit' | 'view';

export interface Tasks {
  tasks: TaskProps[];
}

export interface TaskListProps {
  category: string;
  editingId: string | null;
  id: string;
  tasks: TaskProps[];
}

export interface CategoryTask {
  categoryId: string;
  taskId: string;
}

// export interface CategoryTaskList {
//   categories: CategoryTask[];
// }
