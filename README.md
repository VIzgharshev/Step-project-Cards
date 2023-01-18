# Step-project-Cards
Medical card service project, work in team of two members



# Базова збірка Gulp

За допомогою цих файлів ви зможете швидко налаштувати складання вашого проекту на Gulp.

## Структура каталогів для розміщення файлів стилів та скриптів:

> ./src/pages/\*\*/\*.html  
> ./src/styles/\*\*/\*.scss  
> ./src/scripts/\*\*/\*.js  
> ./src/images/\*\*/\*.png,jpg,jpeg,gif,svg

## Структура каталогів на виході:

> ./dist/.html  
> ./dist/styles.min.css  
> ./dist/scripts.min.js  
> ./dist/img/\*\*/\*.png,jpg,jpeg,gif,svg

## Інструкція:

1. Завантажити всі файли до будь-якої директорії
2. Ввести в терміналі команду: npm i (має бути встановлений node.js)
3. Виконати команду: gulp (запуск таска default)
4. Писати свій код та насолоджуватися автоматичним складанням проекту

## Посилання

[Офіційна сторінка Node.js](https://nodejs.org/uk/)  
[Документація по Gulp](https://gulpjs.com/)  
[Бібліотека пакетів для Gulp](https://www.npmjs.com/)

## Встановлені NPM пакети

[gulp](https://www.npmjs.com/package/gulp) Складальник Gulp  
[gulp-sass](https://www.npmjs.com/package/gulp-sass) Компіляція Scss файлів  
[gulp-babel](https://www.npmjs.com/package/gulp-babel) Перетворює Java Script на старий стандарт  
[gulp-concat](https://www.npmjs.com/package/gulp-concat) Об'єднання декількох файлів в один  
[gulp-uglify](https://www.npmjs.com/package/gulp-uglify) Стиснення та оптимізація Java Script коду  
[gulp-rename](https://www.npmjs.com/package/gulp-rename) Перейменовує файли  
[gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css) Мініфікація та оптимізація CSS файлів  
[gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) Додає вендоні-префікси у CSS  
[gulp-csso](https://www.npmjs.com/package/gulp-csso) Мініфікує та оптимізує CSS  
[gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) Стискає та оптимізує зображення  
[del](https://www.npmjs.com/package/del) Видалення каталогів і файлів  
[gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin) Мініфікує HTML  
[gulp-size](https://www.npmjs.com/package/gulp-size) Відображає у терміналі розмір файлів проекту  
[gulp-newer](https://www.npmjs.com/package/gulp-newer) Оновлює тільки ті файли, які були змінені (зручно для картинок)  
[browser-sync](https://www.npmjs.com/package/browser-sync) Live server з оновленням в реальному часі  
[gulp-plumber](https://www.npmjs.com/package/gulp-plumber) Контроль помилок  
[gulp-notify](https://www.npmjs.com/package/gulp-notify) Повідомлення про помилки

## Пакети несумісні з збіркою:

[gulp-shorthand](https://www.npmjs.com/package/gulp-shorthand)