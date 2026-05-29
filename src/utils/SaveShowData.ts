import type { TaskListProps } from '../types';

export function showData() {
  const saveData = localStorage.getItem('tasks');
  const taskListArr: TaskListProps[] = [
    {
      category: 'Home',
      id: '1',
      tasks: [
        {
          taskId: '10',
          text: 'Making Bed',
          isCompleted: false,
          mode: 'view',
        },

        {
          taskId: '20',
          text: 'Wash Dishes',
          isCompleted: true,
          mode: 'view',
        },
      ],
    },

    {
      category: 'Work',
      id: '2',
      tasks: [
        {
          taskId: '1',
          text: 'Metting',
          isCompleted: true,
          mode: 'view',
        },

        {
          taskId: '2',
          text: 'Drinking Coffee',
          isCompleted: true,
          mode: 'view',
        },
      ],
    },
  ];

  if (saveData) {
    return JSON.parse(saveData);
  }

  localStorage.setItem('tasks', JSON.stringify(taskListArr));

  return taskListArr;

  // return saveData
  //   ? JSON.parse(saveData)
  //   : (localStorage.setItem('tasks', JSON.stringify(taskListArr)), taskListArr);
}

export function saveData(updatedList: TaskListProps[]) {
  return localStorage.setItem('tasks', JSON.stringify(updatedList));
}
