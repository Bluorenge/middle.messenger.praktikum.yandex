import template from './account.hbs';
import Block from '../../utils/Block';
import { PopupProps } from './../../components/popup/popup';
import getFormData from '../../utils/getFormData';
import { withStore } from './../../utils/Store';
import { User } from './../../_models/user';
import AuthController from './../../controllers/AuthController';
import UserController from './../../controllers/UserController';

import { registerComponent } from '../../utils/hbsHelpers';
const context = require.context('', true, /^.*\/(?!.*test).*\.ts$/);
const components = context.keys().map(key => context(key));
components.forEach((item: any) => registerComponent(item.default));

type AccountProps = User & {
    accountView: {
        account: boolean;
        'account-info-edit': boolean;
        ['account-password-edit']: boolean;
    },
    display_name: string | null;
    password: string;
    avatar: string | null;
    accountName: string;
    fields: Field[];
    passwordFields: Field[];
    accountImgPopupProps: PopupProps;
    error: {
        isShow: boolean;
        text: string;
    },
    onFormBtnClick: (e: Event) => void;
    onLogoutBtnClick: () => void;
};

class Account extends Block<AccountProps> {
    public static componentName = 'Account';

    constructor(props: AccountProps) {
        const accountProps: AccountProps = {
            ...props,
            accountView: {
                account: false,
                ['account-info-edit']: false,
                ['account-password-edit']: false,
            },
            accountName: `${props.first_name} ${props.second_name}`,
            fields: [
                {
                    label: 'Почта',
                    name: 'email',
                    type: 'email',
                    value: props.email,
                    class: 'field--oneline',
                    isDisable: true,
                    validationType: 'email',
                },
                {
                    label: 'Логин',
                    name: 'login',
                    type: 'text',
                    value: props.login,
                    class: 'field--oneline',
                    isDisable: true,
                    validationType: 'login',
                },
                {
                    label: 'Имя',
                    name: 'first_name',
                    type: 'text',
                    value: props.first_name,
                    class: 'field--oneline',
                    isDisable: true,
                    validationType: 'name',
                },
                {
                    label: 'Фамилия',
                    name: 'second_name',
                    type: 'text',
                    value: props.second_name,
                    class: 'field--oneline',
                    isDisable: true,
                    validationType: 'name',
                },
                {
                    label: 'Имя в чате',
                    name: 'display_name',
                    type: 'text',
                    value: props.display_name ?? '',
                    class: 'field--oneline',
                    isDisable: true,
                    validationType: 'none',
                },
                {
                    label: 'Телефон',
                    name: 'phone',
                    type: 'text',
                    value: props.phone,
                    class: 'field--oneline',
                    isDisable: true,
                    validationType: 'phone',
                },
            ],
            passwordFields: [
                {
                    label: 'Старый пароль',
                    name: 'oldPassword',
                    type: 'text',
                    class: 'field--oneline',
                    validationType: 'password',
                },
                {
                    label: 'Новый пароль',
                    name: 'newPassword',
                    type: 'text',
                    class: 'field--oneline',
                    validationType: 'password',
                },
                {
                    label: 'Повторите новый пароль',
                    name: 'newPassword_confirm',
                    type: 'text',
                    class: 'field--oneline',
                    validationType: 'password',
                },
            ],
            accountImgPopupProps: {
                title: 'Загрузите файл',
                btnText: 'Поменять',
                field: {
                    label: 'Выбрать файл на компьютере',
                    name: 'avatar',
                    type: 'file',
                    value: '',
                    class: 'field--file',
                    accept: 'image/*',
                },
                onSend: (data: FormData) => UserController.uploadAvatar(data),
            },
            error: {
                isShow: false,
                text: '',
            },
            onFormBtnClick: (e: Event) => this.onFormBtnClick(e),
            onLogoutBtnClick: () => AuthController.logout(),
        };
        setAccountView(accountProps, window.location.pathname.slice(1));

        super(accountProps);
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
            refs: this.refs,
        });
    }

    private onFormBtnClick(e: Event) {
        e.preventDefault();
        const data = getFormData(this as any);
        const isFormValid = this.fieldsValidation(data);

        if (isFormValid && this.props.accountView['account-info-edit']) {
            UserController.changeProfile(data as any);
        } else if (isFormValid) {
            UserController.changePassword(data as any);
        }
    }

    private fieldsValidation(data: TObj): boolean {
        const isValidArr = [];
        for (const [key, val] of Object.entries(data)) {
            let isValid = this.refs[key].checkValid(val);

            if (
                ![data.confirm_password, data.password].includes('')
                && ['newPassword', 'newPassword_confirm'].includes(key)
            ) {
                isValid = this.refs[key].checkValid(data.newPassword, data.newPassword_confirm);
            }
            isValidArr.push(isValid);
        }

        return isValidArr.every(Boolean);
    }
}

function setAccountView(props: Record<string, any>, pageName: string): void {
    Object.keys(props.accountView).forEach(
        i => (props.accountView[i] = i === pageName),
    );
    for (const field in props.fields) {
        props.fields[field].isDisable = !props.accountView['account-info-edit'];
    }
}

const withCurrentUser = withStore((state) => ({ ...state.currentUser, ...state.accountProps }));

export default withCurrentUser(Account as typeof Block);
