const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

function exit() {
  rl.close();
  process.exit(0);
}

function clear() {
  process.stdout.write('\x1Bc');
}

async function displayMenu() {
  console.log('== Hyperbee: Todo App ===');
  console.log('1. List todos');
  console.log('2. Add a todo');
  console.log('3. Toggle todo status');
  console.log('4. Edit todo title');
  console.log('5. Delete a todo');
  console.log('6. Exit');
}

module.exports = {
  question,
  displayMenu,
  exit,
  clear,
};
