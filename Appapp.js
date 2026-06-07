const users = [
  {
    id: '1',
    name: 'Iman',
    isActive: true,
  },
  {
    id: '2',
    name: 'Sara',
    isActive: false,
  },
  {
    id: '3',
    name: 'Ali',
    isActive: true,
  },
];

// const outPut = [
//   {
//     id: '1',
//     name: 'Iman',
//     isActive: true,
//   },
//   {
//     id: '3',
//     name: 'Ali',
//     isActive: true,
//   },
// ];

function getActiveUsers() {
  const activeUsers = users.filter((user) => user.isActive === true);
  return activeUsers;
}

const outPut = getActiveUsers();
//.......................................................................................
//add new product immutable

const products = [
  {
    id: '1',
    title: 'Laptop',
    price: 1200,
  },
  {
    id: '2',
    title: 'Mouse',
    price: 50,
  },
];

const newProduct = {
  id: '3',
  title: 'Keyword',
  price: 2500,
};

const addNewProduct = [...products, newProduct];
//................................................................

const persons = [
  {
    id: '1',
    name: 'Iman',
  },
  {
    id: '2',
    name: 'Sara',
  },
];

const filterdPerson = persons.filter((person) => person.id !== '2');
//.....................................................................
//change complete
const categoriesArr = [
  {
    id: '1',
    title: 'Home',
    tasks: [
      {
        taskId: '10',
        text: 'React',
        done: false,
      },
    ],
  },

  {
    id: '2',
    title: 'Scool',
    tasks: [
      {
        taskId: '2',
        text: 'Vue',
        done: true,
      },
    ],
  },

  {
    id: '3',
    title: 'Work',
    tasks: [
      {
        taskId: '8',
        text: 'Payton',
        done: false,
      },
    ],
  },
];

const category = categoriesArr.find((item) => {
  return item.title === 'Scool';
});

const newTasks = category.tasks.map((item) =>
  item.text === 'Vue' ? { ...item, text: 'Angular' } : item
);

const newCatetgory = {
  ...category,
  tasks: newTasks,
};

const newCategories = categoriesArr.map((item) =>
  item.id === newCatetgory.id ? newCatetgory : item
);
//.................................................................
const usersList = [
  {
    id: '1',
    name: 'Iman',
    isActive: false,
  },
  {
    id: '2',
    name: 'Sara',
    isActive: false,
  },

  {
    id: '3',
    name: 'Ali',
    isActive: true,
  },
];

const newArr = usersList.map((item) => {
  if (item.id === '2') {
    return {
      ...item,
      isActive: true,
    };
  } else {
    return item;
  }
});
//..................................................

const filterdNames = usersList.filter((item) => item.name !== 'Iman');
//...............................................................................

const boards = [
  {
    boardId: '1',
    title: 'Frontend',
    columns: [
      {
        columnId: '10',
        title: 'Todo',
        tasks: [],
      },
    ],
  },

  {
    boardId: '2',
    title: 'Backend',
    columns: [
      {
        columnId: '20',
        title: 'C++',
        tasks: [
          {
            id: '1',
            text: 'Good language',
          },
        ],
      },
    ],
  },
];

const findBoard = boards.find((board) => board.boardId === '1');

const findColumn = findBoard.columns.find((column) => column.columnId === '10');
const newTask = {
  id: '10',
  text: 'good boy',
};

const updatedBoard = boards.map((board) =>
  board.boardId === findBoard.boardId
    ? {
        ...board,
        columns: board.columns.map((column) =>
          column.columnId === findColumn.columnId
            ? { ...column, tasks: [...column.tasks, newTask] }
            : column
        ),
      }
    : board
);

const yy = boards.map((board) => {
  if (board.boardId === '1') {
    return {
      ...board,
      columns: board.columns.map((column) => {
        if (column.columnId === '10') {
          return {
            ...column,
            tasks: [...column.tasks, newTask],
          };
        }
        return column;
      }),
    };
    return board;
  }
});

//.................................................................
// add new employer
const departments = [
  {
    departmentId: '1',
    name: 'Engineering',
    teams: [
      {
        teamId: '10',
        employees: [],
      },
    ],
  },
];

const newEmployer = {
  name: 'Iman',
  age: 33,
  id: 1,
};

const newDepartments = departments.map((department) =>
  department.departmentId === '1'
    ? {
        ...department,
        teams: department.teams.map((team) =>
          team.teamId === '10' ? { ...team, employees: [...team.employees, newEmployer] } : team
        ),
      }
    : department
);

console.log(JSON.stringify(newDepartments, null, 2));
//................................................................

const projectsArray = [
  {
    projectId: '1',
    name: 'Ecommerce',
    tasks: [
      {
        taskId: '10',
        title: 'Login',
        comments: [
          {
            commentId: '100',
            text: 'Need validation',
          },
        ],
      },
    ],
  },
];

const newProjectArray = projectsArray.map((project) =>
  project.projectId === '1'
    ? {
        ...project,
        tasks: project.tasks.map((task) =>
          task.taskId === '10'
            ? {
                ...task,
                comments: task.comments.map((commnet) =>
                  commnet.commentId === '100' ? { ...commnet, text: 'Imangame' } : commnet
                ),
              }
            : task
        ),
      }
    : project
);

console.log(JSON.stringify(newProjectArray, null, 2));
