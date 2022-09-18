import Block from '../../utils/Block';
import template from './login.hbs';
import getFormData from '../../utils/getFormData';

export default class Login extends Block {
    constructor() {
        const loginProps = {
            fields: [
                {
                    type: 'text',
                    name: 'login',
                    label: 'Логин',
                    class: 'field--top-title',
                    validationType: 'login',
                },
                {
                    type: 'text',
                    name: 'password',
                    label: 'Пароль',
                    class: 'field--top-title',
                    validationType: 'password',
                },
            ],
        };
        super(loginProps);

        this.setProps({
            onClick: this.onSignUp.bind(this),
        });
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
            refs: this.refs,
        });
    }

    private onSignUp() {
        getFormData(this);
    }
}
