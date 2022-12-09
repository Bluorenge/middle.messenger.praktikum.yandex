import BaseAPI from './BaseApi';

export interface PasswordData {
    oldPassword: string;
    newPassword: string;
}

export interface ProfileData {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export class UserAPI extends BaseAPI {
    constructor() {
        super('/user');
    }

    changeProfile(data: ProfileData) {
        return this.http.put('/profile', { data });
    }

    changePassword(data: PasswordData) {
        return this.http.put('/password', { data });
    }

    uploadAvatar(data: FormData) {
        return this.http.put('/profile/avatar', {
            data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    read(id: string): Promise<unknown> {
        return this.http.get('/user/' + id);
    }

    create = undefined;
    update = undefined;
    delete = undefined;
}

export default new UserAPI();
