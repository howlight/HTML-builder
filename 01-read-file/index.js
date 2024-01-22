// импортируем необходимые модули
// path используется для работы с путями к файлам
const path = require('path');
// fs используется для работы с файловой системой
const fs = require('fs');

// path.join() объединяет заданные сегменты пути вместе
const filePath = path.join(__dirname, 'text.txt');
// создаем поток для чтения файла 'text.txt'
// 'utf-8' - преобразует объекты Buffer в строку
const stream = fs.createReadStream(filePath, 'utf-8');

// переменная для конкатенации пришедших чанков(кусков данных)
let data = '';

// Обработка событий потока:
// 'data' - вызывается при поступлении новых данных из потока.
stream.on('data', (chunk) => (data += chunk));
// 'end' - вызывается, когда поток завершает чтение файла.
stream.on('end', () => console.log(data));
// 'error' - вызывается в случае возникновения ошибки при чтении файла.
stream.on('error', (error) => console.log('Error', error.message));
