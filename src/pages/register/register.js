import template from './register.hbs';

const context = {
    title: 'Регистрация',
    fields: [
        {
            label: 'Почта',
            name: 'email',
            type: 'email',
            class: 'field--top-title',
        },
        {
            label: 'Логин',
            name: 'login',
            type: 'text',
            class: 'field--top-title',
        },
        {
            label: 'Имя',
            name: 'first_name',
            type: 'text',
            class: 'field--top-title',
        },
        {
            label: 'Фамилия',
            name: 'second_name',
            type: 'text',
            class: 'field--top-title',
        },
        {
            label: 'Телефон',
            name: 'phone',
            type: 'text',
            class: 'field--top-title',
        },
        {
            label: 'Пароль',
            name: 'password',
            type: 'text',
            class: 'field--top-title',
        },
        {
            label: 'Пароль',
            name: 'password',
            type: 'text',
            class: 'field--top-title',
        },
    ],
    btn: {
        text: 'Создать профиль',
    },
    registerLink: {
        text: 'Войти',
        link: '/login.html',
    },
};

export default template(context);
