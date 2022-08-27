import template from './pages-links.hbs';

const context = {
    pagesLinks: [
        {
            name: 'логин',
            link: 'login.html',
        },
        {
            name: 'регистрация',
            link: 'register.html',
        },
        {
            name: 'мессенджер',
            link: 'messenger.html',
        },
        {
            name: 'профиль',
            link: 'account.html',
        },
        {
            name: '404',
            link: 'not-found.html',
        },
        {
            name: '505',
            link: 'server-error.html',
        },
    ],
};

export default template(context);
