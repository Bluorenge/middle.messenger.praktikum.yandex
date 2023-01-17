import UserAPI from '../api/UserApi';
import router from '../utils/Router';
import store from '../utils/Store';
import AuthController from './AuthController';

import { Pages } from './../_models/pages';
import { ProfileData, PasswordData } from './../_models/user';

export class UserController {
    private api = new UserAPI();

    public async changeProfile(data: ProfileData) {
        await this.requestWithCheckError(() => this.api.changeProfile(data));
    }

    public async uploadAvatar(data: FormData) {
        await this.requestWithCheckError(() => this.api.uploadAvatar(data));
    }

    public async changePassword(data: PasswordData) {
        await this.requestWithCheckError(() => this.api.changePassword(data));
    }

    public getUser(id: number) {
        return this.api.read(id);
    }

    public async getFoundUsers(login: string, usersList?: any[]) {
        if (!login) {
            return null;
        }

        let foundUsers = await this.api.getFoundUsers(login);
        if (usersList) {
            foundUsers = foundUsers.filter(x =>
                !usersList.find(y => x.id === y.id),
            );
        }
        return foundUsers;
    }

    private async requestWithCheckError(req: () => Promise<any>) {
        store.set('accountProps.error', null);

        let response: Promise<any>;
        try {
            response = await req();
        } catch (error) {
            console.log(error);
        }

        const reasonText = (response! as any).reason;

        if (reasonText) {
            store.set('accountProps.error', {
                isShow: true,
                text: reasonText,
            });
            return;
        }

        await AuthController.fetchUser();

        router.go(Pages.Account);

        return response!;
    }
}

export default new UserController();
