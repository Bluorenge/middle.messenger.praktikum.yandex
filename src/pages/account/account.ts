import template from './account.hbs';
import Block from '../../utils/Block';
import { registerComponent } from '../../utils/hbsHelpers';
import getFormData from '../../utils/getFormData';
// @ts-ignore
import components from './*/*.ts';

Object.entries(components).forEach(([key, value]: any) =>
    registerComponent(value[key].default),
);

export default class Account extends Block {
    constructor(pageName: string) {
        const accountProps = {
            accountView: {
                account: false,
                ['account-info-edit']: false,
                ['account-password-edit']: false,
            },
            accountName: 'Иван',
            fields: [
                {
                    label: 'Почта',
                    name: 'email',
                    type: 'email',
                    value: 'pochta@yandex.ru',
                    class: 'field--oneline',
                    isDisable: true,
                    validationType: 'email',
                },
                {
                    label: 'Логин',
                    name: 'login',
                    type: 'text',
                    value: 'ivanivanov',
                    class: 'field--oneline',
                    isDisable: true,
                    validationType: 'login',
                },
                {
                    label: 'Имя',
                    name: 'first_name',
                    type: 'text',
                    value: 'Иван',
                    class: 'field--oneline',
                    isDisable: true,
                    validationType: 'name',
                },
                {
                    label: 'Фамилия',
                    name: 'second_name',
                    type: 'text',
                    value: 'Иванов',
                    class: 'field--oneline',
                    isDisable: true,
                    validationType: 'name',
                },
                {
                    label: 'Имя в чате',
                    name: 'display_name',
                    type: 'text',
                    value: 'Иван',
                    class: 'field--oneline',
                    isDisable: true,
                    validationType: '',
                },
                {
                    label: 'Телефон',
                    name: 'phone',
                    type: 'text',
                    value: '+7 (909) 967 30 30',
                    class: 'field--oneline',
                    isDisable: true,
                    validationType: 'phone',
                },
            ],
            passwordFields: [
                {
                    label: 'Старый пароль',
                    name: 'old_password',
                    type: 'text',
                    value: '•••••••••',
                    class: 'field--oneline',
                    validationType: 'password',
                },
                {
                    label: 'Новый пароль',
                    name: 'new_password',
                    type: 'text',
                    value: '•••••••••••',
                    class: 'field--oneline',
                    validationType: 'password',
                },
                {
                    label: 'Повторите новый пароль',
                    name: 'new_password_repeat',
                    type: 'text',
                    value: '•••••••••••',
                    class: 'field--oneline',
                    validationType: 'password',
                },
            ],
        };
        setAccountView(accountProps, pageName);

        super(accountProps);

        this.setProps({
            onClick: this.onClick.bind(this),
        });
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
            refs: this.refs,
        });
    }

    private onClick(e: Event) {
        e.preventDefault();
        getFormData(this);
    }
}

function setAccountView(props: Record<string, any>, pageName: string) {
    Object.keys(props.accountView).forEach(
        i => (props.accountView[i] = i === pageName),
    );
    for (const field in props.fields) {
        props.fields[field].isDisable = !props.accountView['account-info-edit'];
    }
}
