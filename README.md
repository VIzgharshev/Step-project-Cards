# Про проєкт
Проєкт "Card Note" - це третій проєкт в програмі навчання, який розроблений в команді. Ціль проєкту реалізувати набуті знання в модулі Advanced Java Script, та попередніх модулів. 

Результатом проєкту є вебдодаток, який дає можливість потенційному працівнику ліркані, медсестрі або адміністрантору, створювати у своєму робочому кабінеті картки візитів для трьох лікарів, контролювати та змінювати зміст карток, раніше створених візитів, також видаляти візити.

Для реєстрації тестового акаунту можете пройти за [посиланням](https://ajax.test-danit.com/api-pages/cards.html)

## Технології які використовували в проєкті
- Java Script ES6
- HTML5
- SCSS
- BEM
- Bootstrap 5
- GULP 
- AJAX (fetch)
 
## Ізгаршев Володимир
- Розробка дизайн проєкту в Figma. Посилання на макет для проєкту [тут](https://www.figma.com/file/ELZPhY87gsQyntMjR2tvMf/Step-Project-%22Cards%22?node-id=0%3A1&t=g4PyxTMx60p4PUcr-1).
- Робота з sessionStorage.
- Розробка частини Header section, модальне вікно 'Вхід', адаптив під різні девайси, верстка. (файли: header.js, header.scss)
- Розробка частини Filter section, адаптив під різні девайси, верстка. (файли: filter.js, filter.scss)
- Організація робочого процесу, планування, взаємодія.
- Організація та підготовка репозиторію (pull requests, reset.scss, mixins.scss, variables.scss) 

## Мєльнікова Анастасія
- Робота з картками.
- Створення та організація ES6 classes для проєкту.
- Відкриття модального вікна для заповнення інформації про новий візит.
- Додавання катки нового візиту на сторінку, реалізація редагування, видалення, перегляд детальної інформації про візит (файли: 1_visit.js, 2_modal.js, 3_cards.js), index.html(секція: main).
- Верстка карточок (файл: card.scss).
- Редагування gulpfile.js
- Створення адаптива для секції з картками та модальних вікон (новий візит, редагувати візит, детальна інформація про візит).

## Хомишин Олег
- Підготовка Gulp для проекту

## Встановлені NPM пакети в збірку Gulp
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
