import AuthController from './AuthController';
import API, { ProfileData, PasswordData, UserAPI } from '../api/UserApi';
import router from '../utils/Router';
import store from '../utils/Store';

export class UserController {
    private readonly api: UserAPI;

    constructor() {
        this.api = API;
    }

    public async changeProfile(data: ProfileData) {
        let response: XMLHttpRequest;
        try {
            response = await this.api.changeProfile(data);
        } catch (e) {
            console.log('не удалось изменить профиль', response!.response.reason);
        }

        this.checkErrorFrom(response!, 'accountProps');
    }

    public async changePassword(data: PasswordData) {
        let response: XMLHttpRequest;
        try {
            response = await this.api.changePassword(data);
        } catch (e) {
            console.log('не удалось изменить пароль', response!.response.reason);
        }
    }

    public async uploadAvatar(data: FormData) {
        let response: XMLHttpRequest;
        try {
            response = await this.api.uploadAvatar(data);
        } catch (e) {
            console.log('не удалось изменить профиль', response!.response.reason);
        }
    }

    private async checkErrorFrom(response: XMLHttpRequest, propsName: string) {
        const responseStatus = response!.status;
        const isSuccessedStatus = responseStatus >= 200 || responseStatus < 300;

        if (!isSuccessedStatus) {
            store.set(`${propsName}.error`, {
                isValid: false,
                invalidText: response!.response.reason,
            });
            return;
        }
        await AuthController.fetchUser();

        router.go('/account');
    }
}

export default new UserController();
