import AuthAPI from '../api/AuthApi';
import { SignInData } from './../_models/auth';
import store from '../utils/Store';
import router from '../utils/Router';
import { Pages } from '../_models/pages';
import MessagesController from './MessagesController';

export class AuthController {
    private api = new AuthAPI();

    public async signUp(fieldsData: any, formData: any) {
        // Чтобы при неудачной отправке формы не терялись введённые значения
        for (const field of fieldsData) {
            field.value = formData[field.name];
        }
        store.set('registerProps.fields', fieldsData);
        delete formData.confirm_password;

        await this.requestWithCheckError('registerProps', () => this.api.signUp(formData));
    }

    public signIn(data: SignInData) {
        this.requestWithCheckError('loginProps', () => this.api.signIn(data));
    }

    public async fetchUser() {
        let response;
        try {
            response = await this.api.read();
            const reasonText = (response! as any)?.reason;

            if (reasonText) {
                throw new Error(reasonText);
            }
            store.set('currentUser', response);
        } catch (error) {
            console.log('error: ', error);
        }
    }

    public async logout() {
        await this.api.logout();
        MessagesController.closeAll();

        router.go(Pages.Login);
    }

    private async requestWithCheckError(propsName: string, req: () => Promise<any>) {
        store.set(`${propsName}.error`, null);
        store.set(`${propsName}.isLoading`, true);

        let response: Promise<any>;
        try {
            response = await req();
        } catch (error) {
            console.log('error: ', error);
        } finally {
            store.set(`${propsName}.isLoading`, false);
        }

        const reasonText = (response! as any)?.reason;

        if (reasonText) {
            store.set(`${propsName}.error`, {
                isShow: true,
                text: reasonText,
            });
            return;
        }

        await this.fetchUser();

        router.go(Pages.Messenger);
    }
}

export default new AuthController();
