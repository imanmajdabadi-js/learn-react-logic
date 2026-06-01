import { useEffect, useState } from 'react';
import type { Mode, TaskListProps, TaskProps } from '../types';
import { saveData, showData } from '../utils/SaveShowData';
import TaskCategoryAdd from './TaskCategoryAdd';
import TaskForm from './TaskForm';
import TaskItems from './TaskItems';

const TaskList = () => {
  const [taskList, setTaskList] = useState<TaskListProps[]>(showData);

  useEffect(() => {
    const result = taskList.map((category) => {
      return {
        ...category,
        tasks: category.tasks.map((task) => {
          const newObj: Omit<TaskProps, 'mode'> = {
            taskId: task.taskId,
            isCompleted: task.isCompleted,
            text: task.text,
          };
          return newObj;
        }),
      };
    });
    saveData(result);
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
    setTaskList((prev) =>
      prev.map((item) =>
        item.id === categoryId ? { ...item, tasks: [...item.tasks, newTask] } : item
      )
    );
  };

  const handleEditMode = (taskId: string, categoryId: string) => {
    setTaskList((prev) =>
      prev.map((item) =>
        item.id === categoryId
          ? {
              ...item,
              tasks: item.tasks.map((item) =>
                item.taskId === taskId ? { ...item, mode: 'edit' as Mode } : item
              ),
            }
          : item
      )
    );
  };

  const handleSaveMode = (taskId: string, categoryId: string, value: string) => {
    setTaskList((prev) =>
      prev.map((item) =>
        item.id === categoryId
          ? {
              ...item,
              tasks: item.tasks.map((item) =>
                item.taskId === taskId
                  ? {
                      ...item,
                      text: value,
                      // text: value === '' ? item.text : value,
                      mode: value === '' ? 'edit' : ('view' as Mode),
                    }
                  : item
              ),
            }
          : item
      )
    );
  };

  const handleCancelEdit = (taskId: string, categoryId: string) => {
    setTaskList((prev) =>
      prev.map((item) =>
        item.id === categoryId
          ? {
              ...item,
              tasks: item.tasks.map((item) =>
                item.taskId === taskId ? { ...item, mode: 'view' as Mode } : item
              ),
            }
          : item
      )
    );
  };

  const handleCompleted = (taskId: string, categoryId: string) => {
    setTaskList((prev) =>
      prev.map((item) =>
        item.id === categoryId
          ? {
              ...item,
              tasks: item.tasks.map((item) =>
                item.taskId === taskId
                  ? {
                      ...item,
                      isCompleted: item.mode === 'edit' ? !item.isCompleted : item.isCompleted,
                    }
                  : item
              ),
            }
          : item
      )
    );
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
                  onToggleCompledted={(taskId) => handleCompleted(taskId, item.id)}
                  onCancel={(taskId) => handleCancelEdit(taskId, item.id)}
                  onSave={(taskId, value) => handleSaveMode(taskId, item.id, value)}
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
