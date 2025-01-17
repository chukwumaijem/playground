const Hyperbee = require('hyperbee');
const Hypercore = require('hypercore');
const cli = require('./cli');
const { todoBasePath } = require('../helpers');

const core = new Hypercore(todoBasePath);
const db = new Hyperbee(core);

async function addTodo() {
  const title = await cli.question('Enter todo title: ');
  const timestamp = Date.now();
  const value = JSON.stringify({
    title,
    completed: false,
    timestamp,
  });
  await db.put(`todo:${timestamp}`, value);
  console.log('Todo added successfully!');
}

async function getTodos() {
  const todos = [];
  const dbStream = db.createReadStream({
    gt: Buffer.from('todo:'),
    lt: Buffer.from('todo;'),
  });
  for await (const todo of dbStream) {
    todos.push(todo);
  }

  return todos;
}

function displayTodos(todos) {
  todos.forEach((todo, index) => {
    const value = JSON.parse(todo.value);
    const status = value.completed ? 'X' : ' ';
    console.log(`${index + 1}. [${status}] ${value.title}`);
  });
}

async function listTodos() {
  const todos = await getTodos();

  console.log('Your Todos:');
  if (todos.length === 0) {
    console.log('No todos found!');
    return;
  }
  displayTodos(todos);
}

async function deleteTodo() {
  const todos = await getTodos();

  console.log('\nSelect todo to delete:');
  if (todos.length === 0) {
    console.log('No todos found!');
    return;
  }
  displayTodos(todos);

  const input = await cli.question('Enter number to delete: ');
  const selection = parseInt(input) - 1;
  if (selection >= 0 && selection < todos.length) {
    await db.del(todos[selection].key);
    console.log('Todo deleted successfully!');
  } else {
    console.log('Invalid selection!');
  }
}

async function toggleStatus() {
  const todos = await getTodos();

  console.log('\nSelect todo to toggle status:');
  if (todos.length === 0) {
    console.log('No todos found!');
    return;
  }
  displayTodos(todos);

  const input = await cli.question('Enter number to update: ');
  const selection = parseInt(input) - 1;
  if (selection >= 0 && selection < todos.length) {
    const value = JSON.parse(todos[selection].value);
    const newValue = JSON.stringify({
      ...value,
      completed: !value.completed,
    });
    await db.put(todos[selection].key, newValue);
    console.log('Todo marked as incomplete!');
  } else {
    console.log('Invalid selection!');
  }
}

async function editTodo() {
  const todos = await getTodos();

  console.log('\nSelect todo to toggle status:');
  if (todos.length === 0) {
    console.log('No todos found!');
    return;
  }
  displayTodos(todos);

  const input = await cli.question('Enter number to edit: ');
  const selection = parseInt(input) - 1;
  if (selection >= 0 && selection < todos.length) {
    const todo = todos[selection];
    const newTitle = await cli.question('Enter new title: ');
    const value = JSON.stringify({
      ...JSON.parse(todo.value),
      title: newTitle,
    });
    await db.put(todo.key, value, {
      cas: (prev, next) => {
        return JSON.parse(prev.value).title !== JSON.parse(next.value).title;
      },
    });
    console.log('Todo updated successfully!');
  } else {
    console.log('Invalid selection!');
  }
}

async function main() {
  while (true) {
    await cli.displayMenu();
    const choice = await cli.question('Enter your choice (1-6): ');

    switch (choice) {
      case '1':
        cli.clear();
        await listTodos();
        break;
      case '2':
        cli.clear();
        await addTodo();
        break;
      case '3':
        cli.clear();
        await toggleStatus();
        break;
      case '4':
        cli.clear();
        await editTodo();
        break;
      case '5':
        cli.clear();
        await deleteTodo();
        break;
      case '6':
        console.log('Goodbye!');
        cli.exit();
      default:
        console.log('Invalid choice! Please try again.');
    }
    console.log('\n\n\n');
  }
}

main().catch(console.error);
