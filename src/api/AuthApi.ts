import BaseAPI from './BaseApi';

export interface SignInData {
    login: string;
    password: string;
}

export interface SignUpData {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export type User = {
    id: number;
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
    avatar: string;
};

export class AuthAPI extends BaseAPI {
    constructor() {
        super('/auth');
    }

    signIn(data: SignInData) {
        return this.http.post('/signin', { data });
    }

    signUp(data: SignUpData) {
        return this.http.post('/signup', { data });
    }

    read(): Promise<unknown> {
        return this.http.get('/user');
    }

    logout() {
        return this.http.post('/logout');
    }

    create = undefined;
    update = undefined;
    delete = undefined;
}

export default new AuthAPI();