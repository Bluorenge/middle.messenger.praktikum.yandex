messenger
==============================

## Описание

Учебный проект в рамках курса "Мидл фронтенд-разработчик".

## Функционал

Регистрация. Создание чата и добавление/удаление в него/из него пользователя. Отправка сообщений. Изменение данных/пароля пользователя.

## Ссылка на макет

[Макет](https://www.figma.com/file/8FZiCyfEdIhAqLN9ItlmOv/messenger?node-id=0%3A1)

## Запуск проекта

1. `npm i` — установка зависимостей проекта.
2. `npm run start` — команда, запускающая проект.
3. Проект работает на `http://localhost:3000`.

## Задеплоенный проект

[Ссылка](https://radiant-dragon-58e417.netlify.app/)

## Линтинг

`npm run stylelint` — проверка стилей.
`npm run lint` — проверка скриптов.

## Docker

`docker run -it -p 3000:3000 messenger-app:latest`

## Используемые инструменты

- handlebars
- sass
- typescript
- nanoid
- eslint
- stylelint
- mocha/chai
