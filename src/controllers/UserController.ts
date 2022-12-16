import UserAPI from '../api/UserApi';
import { ProfileData, PasswordData } from './../_models/user';
import router from '../utils/Router';
import { Pages } from './../_models/pages';
import store, { StoreEvents } from '../utils/Store';
import AuthController from './AuthController';

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

    public async getUsers(login: string) {
        if (!login) {
            store.set('foundUsers', null, StoreEvents.FoundUsersUpdated);
            return;
        }

        const response = await this.api.getFoundUsers(login);
        store.set('foundUsers', response, StoreEvents.FoundUsersUpdated);
    }

    private async requestWithCheckError(req: () => Promise<any>) {
        store.set('accountProps.error', null);

        let response: Promise<any>;
        try {
            response = await req();
        } catch (error) {
            console.log('error: ', error);
        }

        const reasonText = (response! as any).reason;

        if (reasonText) {
            store.set('accountProps.error', {
                isShow: false,
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
