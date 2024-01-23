// импортирует модули
const fs = require('node:fs/promises');
const path = require('path');

async function getBundle() {
  try {
    // читает файлы в папке styles
    const files = await fs.readdir(path.join(__dirname, 'styles'), {
      withFileTypes: true,
    });
    // массив для стилей
    const styles = [];
    // перебор каждого файла
    for (const file of files) {
      // если это файл с расширением .css
      if (file.isFile() && file.name.includes('.css')) {
        // считывает данные из файла
        const data = await fs.readFile(
          path.join(__dirname, 'styles', file.name),
          'utf-8',
        );
        // добавляет данные в массив со стилями
        styles.push(data);
      }
    }
    // записывает стили из массива в bundle.css
    await fs.writeFile(
      path.join(__dirname, 'project-dist', 'bundle.css'),
      styles.join('\n'),
    );
  } catch (err) {
    console.error('Произошла ошибка:', err);
  }
}

getBundle();
