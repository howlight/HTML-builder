// импортирует модули
const fs = require('node:fs/promises');
const path = require('path');

async function createFolder() {
  try {
    // создает папку project-dist
    await fs.mkdir(path.join(__dirname, 'project-dist'), {
      recursive: true,
    });
  } catch (err) {
    console.error(err);
  }
}

async function replaceComponents() {
  try {
    const componentsPath = path.join(__dirname, 'components');
    const templatePath = path.join(__dirname, 'template.html');
    // считывает данные из template.html в переменную ('data')
    let template = await fs.readFile(templatePath, 'utf-8');
    // получает массив: [ 'articles.html', etc...]
    const files = await fs.readdir(componentsPath);

    for (const file of files) {
      // если расширение файла === .html
      if (path.extname(file) === '.html') {
        // присваивает имя файла без расширения .html  ('articles')
        const componentName = path.basename(file, '.html');
        // считывает данные из file в переменную ('data')
        const componentData = await fs.readFile(
          path.join(componentsPath, file),
          'utf-8',
        );
        // создает регулярное выражение с глобальным сопоставлением ( /{{articles}}/g )
        const regExp = new RegExp(`{{${componentName}}}`, 'g');
        // заменяет данные в строке
        template = template.replace(regExp, componentData);
      }
    }
    // записывает данные в файл index.html
    await fs.writeFile(
      path.join(__dirname, 'project-dist', 'index.html'),
      template,
    );
  } catch (err) {
    console.error(err);
  }
}

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
      const filePath = path.join(file.path, `${file.name}`);
      // получает расширение файла
      const fileExtension = path.extname(filePath);
      // если это файл с расширением .css
      if (file.isFile() && fileExtension === '.css') {
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
      path.join(__dirname, 'project-dist', 'style.css'),
      styles.join('\n'),
    );
  } catch (err) {
    console.error(err);
  }
}

async function copyDir(src, dest) {
  try {
    // создает новую директорию 06-build-page/project-dist/assets
    // { recursive: true } - создает все промежуточные папки, если они отсутствуют
    await fs.mkdir(dest, { recursive: true });
    // получает массив файлов и папок в папке 06-build-page/assets
    // { withFileTypes: true } - возвращает объекты fs.Dirent (файлы и папки)
    const files = await fs.readdir(src, { withFileTypes: true });
    // перебирает массив файлов и папок
    for (const file of files) {
      // путь к исходной папке или файлу
      const srcPath = path.join(src, file.name);
      // путь к целевой папке или файлу
      const destPath = path.join(dest, file.name);
      // если папка
      if (file.isDirectory()) {
        // рекурсивный вызов для копирования вложенных папок
        await copyDir(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
    // ловит ошибку
  } catch (err) {
    console.error(err);
  }
}

async function buildPage() {
  await createFolder();
  await replaceComponents();
  await getBundle();
  await copyDir(
    path.join(__dirname, 'assets'),
    path.join(__dirname, 'project-dist', 'assets'),
  );
}

buildPage();
