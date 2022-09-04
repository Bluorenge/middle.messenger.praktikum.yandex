import './account-img/account-img';
import template from './account.hbs';
import mockAccountImg from '../../../static/img/svg/photo.svg';

let context = {
    view: {
        account: false,
        ['account-info-edit']: false,
        ['account-password-edit']: false,
    },
    prevBtn: {
        class: 'btn--arrow-left',
        text: '',
        href: '/account.html',
    },
    accountImg: mockAccountImg,
    accountName: 'Иван',
    fields: [
        {
            label: 'Почта',
            name: 'email',
            type: 'email',
            value: 'pochta@yandex.ru',
            class: 'field--oneline',
            isDisable: true,
        },
        {
            label: 'Логин',
            name: 'login',
            type: 'text',
            value: 'ivanivanov',
            class: 'field--oneline',
            isDisable: true,
        },
        {
            label: 'Имя',
            name: 'first_name',
            type: 'text',
            value: 'Иван',
            class: 'field--oneline',
            isDisable: true,
        },
        {
            label: 'Фамилия',
            name: 'second_name',
            type: 'text',
            value: 'Иванов',
            class: 'field--oneline',
            isDisable: true,
        },
        {
            label: 'Имя в чате',
            name: 'display_name',
            type: 'text',
            value: 'Иван',
            class: 'field--oneline',
            isDisable: true,
        },
        {
            label: 'Телефон',
            name: 'phone',
            type: 'text',
            value: '+7 (909) 967 30 30',
            class: 'field--oneline',
            isDisable: true,
        },
    ],
    passwordFields: [
        {
            label: 'Старый пароль',
            name: 'oldPassword',
            type: 'text',
            value: '•••••••••',
            class: 'field--oneline',
        },
        {
            label: 'Новый пароль',
            name: 'newPassword',
            type: 'text',
            value: '•••••••••••',
            class: 'field--oneline',
        },
        {
            label: 'Повторите новый пароль',
            name: '',
            type: 'text',
            value: '•••••••••••',
            class: 'field--oneline',
        },
    ],
    saveBtn: {
        class: '',
        text: 'Сохранить',
    },
    popupContext: {
        title: 'Загрузите файл',
        field: {
            label: 'Выбрать файл на компьютере',
            name: 'avatar',
            type: 'file',
            value: '',
            class: 'field--file',
        },
        btn: {
            text: 'Поменять',
        },
    },
};

function createTemplate(pageName) {
    Object.keys(context.view).forEach((i) => (context.view[i] = false));
    context.view[pageName] = true;
    Object.keys(context.fields).forEach(
        (i) =>
            (context.fields[i].isDisable = !context.view['account-info-edit'])
    );

    return template(context);
}

export default createTemplate;
