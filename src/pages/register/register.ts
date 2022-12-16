import Block from '../../utils/Block';
import template from './register.hbs';
import getFormData from '../../utils/getFormData';
import AuthController from './../../controllers/AuthController';
import { withStore } from '../../utils/Store';

type RegisterProps = {
    fields: Field[],
    error: {
        isShow: boolean;
        text: string;
    },
    onClick: (e: Event) => void,
};

class Register extends Block<RegisterProps> {
    constructor() {
        const registerProps: RegisterProps = {
            fields: [
                {
                    label: 'Почта',
                    name: 'email',
                    type: 'email',
                    validationType: 'email',
                    value: '',
                },
                {
                    label: 'Логин',
                    name: 'login',
                    type: 'text',
                    validationType: 'login',
                    value: '',
                },
                {
                    label: 'Имя',
                    name: 'first_name',
                    type: 'text',
                    validationType: 'name',
                    value: '',
                },
                {
                    label: 'Фамилия',
                    name: 'second_name',
                    type: 'text',
                    validationType: 'name',
                    value: '',
                },
                {
                    label: 'Телефон',
                    name: 'phone',
                    type: 'text',
                    validationType: 'phone',
                    value: '',
                },
                {
                    label: 'Пароль',
                    name: 'password',
                    type: 'text',
                    validationType: 'password',
                    value: '',
                },
                {
                    label: 'Пароль (ещё раз)',
                    name: 'confirm_password',
                    type: 'text',
                    validationType: 'password',
                    value: '',
                },
            ],
            error: {
                isShow: false,
                text: '',
            },
            onClick: (e: Event) => this.onSignUp(e),
        };
        super(registerProps);
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
            refs: this.refs,
        });
    }

    private onSignUp(e: Event) {
        e.preventDefault();
        const data = getFormData(this as any);
        const isFormValid = this.fieldsValidation(data);

        if (isFormValid) {
            AuthController.signUp(this.props.fields, data);
        }
    }

    private fieldsValidation(data: TObj): boolean {
        const isValidArr = [];
        for (const [key, val] of Object.entries(data)) {
            let isValid = this.refs[key].checkValid(val);

            // Потому что пароли проверяем в контроллере
            if (
                ![data.confirm_password, data.password].includes('')
                && ['confirm_password', 'password'].includes(key)
            ) {
                isValid = this.refs[key].checkValid(data.confirm_password, data.password);
            }
            isValidArr.push(isValid);
        }

        return isValidArr.every(Boolean);
    }
}

export const withUser = withStore((state) => ({ ...state.registerProps }));

export default withUser(Register as typeof Block);
