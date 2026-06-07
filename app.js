const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

const result = numbers.filter((item) => {
  return {};
});

const users = [
  {
    id: 1,
    name: 'Alis',
    age: 17,
  },
  {
    id: 2,
    name: 'Bob',
    age: 25,
  },

  {
    id: 3,
    name: 'Charlie',
    age: 15,
  },
];

const foundUser = users.find((user) => {
  return user.id === 2;
});

const names = users.map((user) => {
  return user.name;
});

const adults = users.filter((item) => item.age > 17).map((item) => item.name);
const children = users
  .filter((item) => item.age < 18)
  .filter((item) => item.name.startsWith('C'))
  .map((item) => item.name);

const cart = [
  {
    product: 'Laptop',
    price: 1000,
    quantity: 1,
  },

  {
    product: 'Mouse',
    price: 25,
    quantity: 2,
  },

  {
    product: 'Keyword',
    price: 75,
    quantity: 1,
  },
];

const priceNumbers = cart.map((item) => item.price * item.quantity);
let largestNumber = 0;
let biggestItemIndex = -1;
priceNumbers.forEach((item, index) => {
  if (item > largestNumber) {
    largestNumber = item;
    biggestItemIndex = index;
  }
});

const found = cart.find((item) => item.price * item.quantity === largestNumber);
if (found) {
}

const user = {
  id: 1,
  name: 'Alice',
  age: 25,
};
const copy = { ...user, name: 'Bob' };

const copyCart = [{ product: 'Monitor', price: 2000, quantity: 1 }, ...cart];

const resultCart = cart.filter((item) => item.product !== 'Mouse');

const findeIndex = cart.findIndex((item) => item.product === 'Mouse');
if (findeIndex !== -1) {
  const copyArray = [...cart];
  copyArray.splice(findeIndex, 1);
}

const todos = [
  {
    id: 1,
    text: 'Learn React',
    completed: false,
  },

  {
    id: 2,
    text: 'Learn Js',
    completed: true,
  },
];

const newTodoArray = todos.map((item) => {
  if (item.id === 2) {
    return {
      ...item,
      completed: !item.completed,
    };
  } else {
    return item;
  }
});

const newCartArray2 = cart.map((item) => {
  if (item.product === 'Keyword') {
    return {
      ...item,
      quantity: item.quantity + 1,
    };
  } else {
    return item;
  }
});
const newCartArray3 = cart.map((item) =>
  item.product === 'Keyword' ? { ...item, quantity: item.quantity + 1 } : item
);
