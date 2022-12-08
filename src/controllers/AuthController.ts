import store from '../utils/Store';
import API, { AuthAPI, SignInData } from '../api/AuthApi';
import Router from '../utils/Router';

export class AuthController {
    private readonly api: AuthAPI;

    constructor() {
        this.api = API;
    }

    public async signIn(data: SignInData) {
        let response: XMLHttpRequest;
        try {
            response = await this.api.signIn(data);
        } catch (e) {
            console.log('не удалось залогиниться', response!.response.reason);
        }

        this.checkErrorFrom(response!, 'loginProps');
    }

    public async signUp(fieldsData: any, formData: any) {
        // Чтобы при неудачной отправке формы не терялись введённые значения
        for (const field of fieldsData) {
            field.value = formData[field.name];
        }
        store.set('registerProps.fields', fieldsData);

        let response: XMLHttpRequest;
        try {
            delete formData.confirm_password;
            response = await this.api.signUp(formData);
        } catch (e) {
            console.log('не удалось зарегаться', response!.response.reason);
        }

        this.checkErrorFrom(response!, 'registerProps');
    }

    public async fetchUser() {
        const user = await this.api.read();
        const userData = user as any;
        store.set('currentUser', userData.response);
    }

    public async logout() {
        await this.api.logout();

        Router.go('/login');
    }

    private async checkErrorFrom(response: XMLHttpRequest, propsName: string) {
        const responseStatus = response!.status;
        const isSuccessedStatus = responseStatus >= 200 && responseStatus < 300;

        if (!isSuccessedStatus) {
            store.set(`${propsName}.error`, {
                isValid: false,
                invalidText: response!.response.reason,
            });
            return;
        }
        await this.fetchUser();

        Router.go('/messenger');
    }
}

export default new AuthController();
