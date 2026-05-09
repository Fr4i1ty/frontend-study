**Live версия**: [https://fr4i1ty.github.io/frontend-study/](https://fr4i1ty.github.io/frontend-study/)  
# DB for WebDev – Базы данных в веб-разработке

Учебный проект по предмету «Технологии разработки интернет-приложений».  
Тематика: Базы данных в веб-разработке.

## Содержание проекта
- Главная страница с карточками технологий
- Страницы детального описания:
  - PostgreSQL
  - MySQL
  - MongoDB
  - Redis
  - Supabase
- Сравнительная таблица
- Страница с видео
- Страницы «О проекте» и «Контакты»

Все страницы связаны единой навигацией, имеют боковую панель (сайдбар) и футер.

## Использованные технологии
- **HTML5**
- **CSS3**
- **CSS-фреймворк [Chota](https://github.com/jenil/chota)**
- **JavaScript (ES6+)**
- **Git + GitHub Pages**

## Как запустить локально
1. Клонировать репозиторий:  
   `git clone https://github.com/Fr4i1ty/frontend-study`
2. Открыть корневую папку проекта.
3. Запустить `index.html` в браузере (или через Live Server, если используете редактор типа VS Code).

Никаких зависимостей и сборщиков не требуется – проект работает на чистом HTML/CSS/JS.

## Структура проекта
```
project-root/
├── index.html                    
├── pages/                        
│   ├── about.html
│   ├── comparison.html
│   ├── contact.html
│   ├── mongodb.html
│   ├── mysql.html
│   ├── postgresql.html
│   ├── redis.html
│   ├── supabase.html
│   └── videos.html
├── assets/
│   ├── css/
│   │   ├── styles-min.css
    │   ├── app.css
│   │   └── chota.css             
│   └── img/
│       ├── mongodb-logo.png
│       ├── mongodb-logo.webp
│       ├── mysql-logo.png
│       ├── mysql-logo.webp
│       ├── postgresql-logo.png
│       ├── postgresql-logo.webp
│       ├── redis-logo.png
│       ├── redis-logo.webp
│       ├── supabase-logo.png
│       └── supabase-logo.webp             
├── components/                   
│   ├── app-navbar.js / app-navbar-min.js
│   ├── app-footer.js / app-footer-min.js
│   ├── app-modal.js / app-modal-min.js
│   ├── contact-form.js / contact-form-min.js
│   ├── info-card.js / info-card-min.js
│   └── sidebar-content.js / sidebar-content-min.js
└── README.md
```