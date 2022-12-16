import BaseAPI from './BaseApi';
import { SignInData, SignUpData, SignUpResponse } from './../_models/auth';
import { User } from './../_models/user';

export default class AuthAPI extends BaseAPI {
    constructor() {
        super('/auth');
    }

    signUp(data: SignUpData): Promise<SignUpResponse> {
        return this.http.post('/signup', { data });
    }

    signIn(data: SignInData) {
        return this.http.post('/signin', { data });
    }

    read(): Promise<User> {
        return this.http.get('/user');
    }

    logout() {
        return this.http.post('/logout');
    }

    create = undefined;
    update = undefined;
    delete = undefined;
}
