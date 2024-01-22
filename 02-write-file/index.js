// импортирует необходимые модули
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// создает поток записи в текстовый файл output.txt
const fileStream = fs.createWriteStream(path.join(__dirname, 'output.txt'));

// деструктуризация объекта process для получения потоков стандартного ввода и вывода
const { stdin: input, stdout: output } = require('node:process');
//  cоздает интерфейс ввода-вывода
const rl = readline.createInterface({ input, output });

// приветственное сообщение
console.log('Hello, write some text, please');

// при вводе текста и нажатии enter, срабатывает обработчик события line
rl.on('line', (input) => {
  // если ввели exit
  if (input.toLowerCase() === 'exit') {
    console.log('Thank you. Have a nice day!');
    // закрывает интерфейс ввода-вывода
    rl.close();
  } else {
    // записывает введенный текст в файл
    fileStream.write(input + '\n');
  }
});
// при нажатии ctrl+c, срабатывает обработчик события SIGINT
rl.on('SIGINT', () => {
  console.log('Thank you. Have a nice day!');
  rl.close();
});
