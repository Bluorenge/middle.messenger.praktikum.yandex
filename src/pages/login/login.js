import template from './login.hbs';

const context = {
    title: 'Вход',
    fields: [
        {
            label: 'Логин',
            name: 'login',
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
        text: 'Войти',
    },
    registerLink: {
        text: 'Впервые?',
        link: '/register.html',
    },
};

export default template(context);
