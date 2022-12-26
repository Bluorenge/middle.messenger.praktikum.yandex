import BaseAPI from './BaseApi';
import { ProfileData, PasswordData, User } from './../_models/user';

export default class UserAPI extends BaseAPI {
    constructor() {
        super('/user');
    }

    changeProfile(data: ProfileData): Promise<User> {
        return this.http.put('/profile', { data });
    }

    uploadAvatar(data: FormData): Promise<User> {
        return this.http.put('/profile/avatar', {
            data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    changePassword(data: PasswordData) {
        return this.http.put('/password', { data });
    }

    read(id: number): Promise<User> {
        return this.http.get('/user/' + id);
    }

    getFoundUsers(login: string): Promise<User[]> {
        return this.http.post('/search', {
            data: { login },
        });
    }

    create = undefined;
    update = undefined;
    delete = undefined;
}
