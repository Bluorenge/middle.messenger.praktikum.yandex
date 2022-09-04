import template from './error-page.hbs';

let context = {
    error: '',
    desc: '',
    prevLink: {
        link: '/messenger.html',
        text: 'Назад к чатам',
    },
};

function createTemplate(error) {
    context.error = error;
    if (context.error === '404') {
        context.desc = 'Упс. Не туда попали';
    } else {
        context.desc = 'Мы уже фиксим';
    }
    return template(context);
}

export default createTemplate;
