// импортирует модули
const fs = require('node:fs/promises');
const path = require('path');

// создает асинхронную функцию
async function copyDir() {
  try {
    // await - дожидается выполнения каждой асинхронной функции
    // создает новую директорию files-copy
    await fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });

    // получает массив файлов в папке files-copy
    const filesCopy = await fs.readdir(path.join(__dirname, 'files-copy'));
    // перебирает массив файлов
    for (const file of filesCopy) {
      // удаляет файлы из папки
      await fs.unlink(path.join(__dirname, 'files-copy', file));
    }
    // получает массив файлов в папке files
    const files = await fs.readdir(path.join(__dirname, 'files'));
    // перебирает массив файлов
    for (const file of files) {
      // копирует каждый файл из src в dest
      await fs.copyFile(
        path.join(__dirname, 'files', file),
        path.join(__dirname, 'files-copy', file),
      );
    }
    // ловит ошибку
  } catch (err) {
    console.error('Произошла ошибка:', err);
  }
}

copyDir();
