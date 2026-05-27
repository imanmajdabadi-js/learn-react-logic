import type { TaskListProps } from '../types';

export function showTask() {
  const saveData = localStorage.getItem('tasks');
  const taskListArr: TaskListProps[] = [
    {
      category: 'Home',
      id: '1',
      tasks: [
        {
          taskId: '1',
          text: 'Making Bed',
          isCompleted: false,
        },

        {
          taskId: '2',
          text: 'Wash Dishes',
          isCompleted: true,
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
        },

        {
          taskId: '2',
          text: 'Drinking Coffee',
          isCompleted: true,
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
