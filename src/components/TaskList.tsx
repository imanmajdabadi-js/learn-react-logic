import { useEffect, useState } from 'react';
import type { CategoryTask, TaskListProps as CategoryType, TaskProps } from '../types';
import { saveData, showData } from '../utils/SaveShowData';
import TaskCategoryAdd from './TaskCategoryAdd';
import TaskForm from './TaskForm';
import TaskItems from './TaskItems';

const TaskList = () => {
  const [categories, setCategories] = useState<CategoryType[]>(showData);
  const [categoryTasks, setCategoryTasks] = useState<CategoryTask[]>([]);

  useEffect(() => {
    const result = categories.map((category) => {
      return {
        ...category,
        tasks: category.tasks.map((task) => {
          const newObj = {
            taskId: task.taskId,
            isCompleted: task.isCompleted,
            text: task.text,
          };
          return newObj;
        }),
      };
    });
    saveData(result);
  }, [categories]);

  const handleAddCategoryTask = (categoryText: string) => {
    const newCategoryAdd = {
      category: categoryText,
      id: crypto.randomUUID(),
      tasks: [],
      editingId: null,
    };

    setCategories((prev) => [...prev, newCategoryAdd]);
  };

  const handleDeleteTask = (taskId: string, categoryId: string) => {
    setCategories((prev) =>
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
    };
    setCategories((prev) =>
      prev.map((item) =>
        item.id === categoryId ? { ...item, tasks: [...item.tasks, newTask] } : item
      )
    );
  };

  const handleEditMode = (taskId: string, categoryId: string) => {
    setCategoryTasks((prev) => [...prev, { taskId, categoryId }]);
  };

  const handleSaveMode = (
    taskId: string,
    categoryId: string,
    value: string,
    draftIsCompleted: boolean
  ) => {
    if (value === '') {
      return;
    }
    setCategories((prev) =>
      prev.map((item) =>
        item.id === categoryId
          ? {
              ...item,
              editingId: item.editingId,
              tasks: item.tasks.map((item) =>
                item.taskId === taskId
                  ? {
                      ...item,
                      text: value,
                      isCompleted: draftIsCompleted,
                    }
                  : item
              ),
            }
          : item
      )
    );

    setCategoryTasks((prev) =>
      prev.filter((item) => item.taskId !== taskId || item.categoryId !== categoryId)
    );
  };

  const handleCancelEdit = (taskId: string, categoryId: string) => {
    setCategoryTasks((prev) =>
      prev.filter((item) => item.taskId !== taskId || item.categoryId !== categoryId)
    );
  };

  const handleCompleted = (taskId: string, categoryId: string) => {
    setCategories((prev) =>
      prev.map((item) =>
        item.id === categoryId
          ? {
              ...item,
              tasks: item.tasks.map((item) =>
                item.taskId === taskId
                  ? {
                      ...item,
                      isCompleted: !item.isCompleted,
                    }
                  : item
              ),
            }
          : item
      )
    );
  };

  function findTaskEditingId(categoryId: string): string | null {
    const find = categoryTasks.find((pair) => {
      if (pair.categoryId === categoryId) {
        return true;
      } else {
        return false;
      }
    });

    if (find) {
      return find.taskId;
    } else {
      return null;
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {categories?.map((category: CategoryType) => {
          // const editingId = findTaskEditingId(item.id);
          let editingTaskId: string | null = null;
          const selectedCategoryTask = categoryTasks.find((pair) => {
            if (pair.categoryId === category.id) {
              return true;
            } else {
              return false;
            }
          });
          if (selectedCategoryTask) {
            editingTaskId = selectedCategoryTask.taskId;
          }

          return (
            <div className="w-full" key={category.id}>
              <TaskForm onAddTask={(textTask) => handleAddTask(category.id, textTask)} />
              <div className="bg-white rounded-3xl shadow-2xl ">
                <p className="text-center font-bold">{category.category}</p>
                <TaskItems
                  editingId={editingTaskId}
                  onToggleCompledted={(taskId) => handleCompleted(taskId, category.id)}
                  onCancel={(taskId) => handleCancelEdit(taskId, category.id)}
                  onSave={(taskId, value, draftIsCompleted) =>
                    handleSaveMode(taskId, category.id, value, draftIsCompleted)
                  }
                  onEdit={(taskId) => handleEditMode(taskId, category.id)}
                  onDeleteTask={(taskId) => handleDeleteTask(taskId, category.id)}
                  tasks={category.tasks}
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
