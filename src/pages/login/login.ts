import Block from '../../utils/Block';
import template from './login.hbs';
import getFormData from '../../utils/getFormData';
import AuthController from './../../controllers/AuthController';
import { withStore } from './../../utils/Store';

class Login extends Block {
    constructor() {
        const loginProps = {
            fields: [
                {
                    type: 'text',
                    name: 'login',
                    label: 'Логин',
                },
                {
                    type: 'text',
                    name: 'password',
                    label: 'Пароль',
                },
            ],
            error: {
                isValid: false,
                invalidText: '',
            },
        };
        super(loginProps);

        this.setProps({
            onSingInBtnClick: this.onSignIn.bind(this),
        });
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
        });
    }

    private onSignIn(e: Event) {
        e.preventDefault();
        const data = getFormData(this);
        AuthController.signIn(data as any);
    }
}

export const withLoginProps = withStore((state) => ({ ...state.loginProps }));

export default withLoginProps(Login as typeof Block);
