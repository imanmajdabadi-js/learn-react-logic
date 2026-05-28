import { useEffect, useState } from 'react';
import type { Mode, TaskListProps, TaskProps } from '../types';
import { saveData, showData } from '../utils/SaveShowData';
import TaskCategoryAdd from './TaskCategoryAdd';
import TaskForm from './TaskForm';
import TaskItems from './TaskItems';

const TaskList = () => {
  const [taskList, setTaskList] = useState<TaskListProps[]>(showData);

  useEffect(() => {
    saveData(taskList);
  }, [taskList]);

  const handleAddCategoryTask = (categoryText: string) => {
    const newCategoryAdd = {
      category: categoryText,
      id: crypto.randomUUID(),
      tasks: [],
    };

    setTaskList((prev) => [...prev, newCategoryAdd]);
  };

  const handleDeleteTask = (taskId: string, categoryId: string) => {
    // const foundedCategory = taskList?.find((item) => item.id === categoryId);
    // if (!foundedCategory) return;
    // const updatedTasks = foundedCategory?.tasks.filter((item) => item.taskId !== taskId);
    // const updatedCategory = {
    //   ...foundedCategory,
    //   tasks: updatedTasks,
    // };
    // const newTaskList = taskList?.map((item) => (item.id === categoryId ? updatedCategory : item));
    // setTaskList(newTaskList);
    setTaskList((prev) =>
      prev.map((item) =>
        item.id === categoryId
          ? { ...item, tasks: item.tasks.filter((item) => item.taskId !== taskId) }
          : item
      )
    );
  };

  const handleAddTask = (categoryId: string, textTask: string) => {
    const newTask: TaskProps = {
      taskId: crypto.randomUUID(),
      text: textTask,
      isCompleted: true,
      mode: 'view',
    };
    const foundedCategory = taskList?.find((item) => item.id === categoryId);
    if (!foundedCategory) {
      return;
    }
    const updateTasks = [...foundedCategory.tasks, newTask];
    const updatedList = taskList.map((item) =>
      item.id === categoryId ? { ...item, tasks: updateTasks } : item
    );

    setTaskList(updatedList);
    saveData(updatedList);
    // setTaskList((prev) =>
    //   prev?.map((item) =>
    //     item.id === categoryId ? { ...item, tasks: [...item.tasks, newTask] } : item
    //   )
    // );
  };

  const handleEditMode = (taskId: string, categoryId: string) => {
    console.log(taskId, 'taskId', categoryId, 'categoryId');
    const foundedCategory = taskList.find((item) => item.id === categoryId);
    if (foundedCategory) {
      const updatedTask = foundedCategory?.tasks.map((item) =>
        item.taskId === taskId ? { ...item, mode: 'edit' as Mode } : item
      );
      // const copyCategory = { ...foundedCategory, tasks: updatedTask };
      // setMode('edit');
      const copyTaskList = taskList.map((item) =>
        item.id === categoryId ? { ...item, tasks: updatedTask } : item
      );
      setTaskList(copyTaskList);
    }
  };

  const handleSaveMode = () => {
    console.log('save');

    // setMode('save');
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {taskList?.map((item: TaskListProps) => {
          return (
            <div className="w-full" key={item.id}>
              <TaskForm onAddTask={(textTask) => handleAddTask(item.id, textTask)} />
              <div className="bg-white rounded-3xl shadow-2xl ">
                <p className="text-center font-bold">{item.category}</p>
                <TaskItems
                  onSave={handleSaveMode}
                  onEdit={(taskId) => handleEditMode(taskId, item.id)}
                  onDeleteTask={(taskId) => handleDeleteTask(taskId, item.id)}
                  tasks={item.tasks}
                />
              </div>
            </div>
          );
        })}
      </div>
      <TaskCategoryAdd onAddCategoryTask={(categoryText) => handleAddCategoryTask(categoryText)} />
    </>
  );
};

export default TaskList;
