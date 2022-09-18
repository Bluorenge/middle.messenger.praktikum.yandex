import Block from '../../utils/Block';
import template from './register.hbs';
import getFormData from '../../utils/getFormData';

export default class Register extends Block {
    constructor() {
        const registerProps = {
            fields: [
                {
                    label: 'Почта',
                    name: 'email',
                    type: 'email',
                    class: 'field--top-title',
                    validationType: 'email',
                },
                {
                    label: 'Логин',
                    name: 'login',
                    type: 'text',
                    class: 'field--top-title',
                    validationType: 'login',
                },
                {
                    label: 'Имя',
                    name: 'first_name',
                    type: 'text',
                    class: 'field--top-title',
                    validationType: 'name',
                },
                {
                    label: 'Фамилия',
                    name: 'second_name',
                    type: 'text',
                    class: 'field--top-title',
                    validationType: 'name',
                },
                {
                    label: 'Телефон',
                    name: 'phone',
                    type: 'text',
                    class: 'field--top-title',
                    validationType: 'phone',
                },
                {
                    label: 'Пароль',
                    name: 'password',
                    type: 'text',
                    class: 'field--top-title',
                    validationType: 'password',
                },
                {
                    label: 'Пароль',
                    name: 'password',
                    type: 'text',
                    class: 'field--top-title',
                    validationType: '',
                },
            ],
        };
        super(registerProps);

        this.setProps({
            onClick: this.onSignIn.bind(this),
        });
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
            refs: this.refs,
        });
    }

    private onSignIn() {
        getFormData(this);
    }
}
