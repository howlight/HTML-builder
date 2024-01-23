// подключение модулей
const fs = require('fs');
const path = require('path');

// путь к папке secret-folder
const folderPath = path.join(__dirname, 'secret-folder');

// чтение содержимого папки
// { withFileTypes: true } - возвращает объект fs.Dirent для каждого элемента
fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    // перебираем массив объектов Dirent
    files.forEach((file) => {
      // если элемент это файл
      if (file.isFile()) {
        // получение информации о файле
        const filePath = path.join(file.path, `${file.name}`);
        const fileExtension = path.extname(filePath);
        const fileName = path.basename(filePath);
        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.log(err);
          }
          const fileSize = stats.size;
          // вывод всей информации в консоль
          console.log(
            `${fileName.replace(fileExtension, '')} - ${fileExtension.replace(
              '.',
              '',
            )} - ${fileSize}b`,
          );
        });
      }
    });
  }
});
