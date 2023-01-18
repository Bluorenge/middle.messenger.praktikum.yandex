import Block from '../../utils/Block';
import template from './login.hbs';
import getFormData from '../../utils/getFormData';
import AuthController from './../../controllers/AuthController';
import { withStore } from './../../utils/Store';

export class Login extends Block {
    constructor() {
        const loginProps = {
            fields: [
                {
                    type: 'text',
                    name: 'login',
                    label: 'Логин',
                    validationType: 'empty',
                },
                {
                    type: 'text',
                    name: 'password',
                    label: 'Пароль',
                    validationType: 'empty',
                },
            ],
            error: {
                isShow: false,
                text: '',
            },
            onSingInBtnClick: (e: Event) => this.onSignIn(e),
        };
        super(loginProps);
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
            refs: this.refs,
        });
    }

    private onSignIn(e: Event) {
        e.preventDefault();
        const data = getFormData(this);
        const isFormValid = this.fieldsValidation(data);

        if (isFormValid) {
            AuthController.signIn(data as any);
        }
    }

    private fieldsValidation(data: TObj): boolean {
        const isValidArr = [];

        for (const [key, val] of Object.entries(data)) {
            const isValid = this.refs[key].checkValid(val);
            isValidArr.push(isValid);
        }

        return isValidArr.every(Boolean);
    }
}

export const withLoginProps = withStore((state) => ({ ...state.loginProps }));

export default withLoginProps(Login as typeof Block);
