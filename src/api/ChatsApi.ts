import BaseAPI from './BaseApi';
import { User } from './AuthApi';

export interface ChatsOption {
    offset?: number;
    limit?: number;
    title?: string;
}

export interface ChatInfo {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
        user: User,
        time: string;
        content: string;
    }
}

export class ChatsAPI extends BaseAPI {
    constructor() {
        super('/chats');
    }

    create(title: string) {
        return this.http.post('', {
            data: title,
        });
    }

    delete(id: number): Promise<unknown> {
        return this.http.delete('', {
            data: { chatId: id },
        });
    }

    read(options?: ChatsOption) {
        return this.http.get('', {
            data: options,
        });
    }

    getUsers(id: number) {
        return this.http.get(`/${id}/users`);
    }

    addUsers(id: number, users: number[]) {
        return this.http.put('/users', {
            data: { users, chatId: id },
        });
    }

    async getToken(id: number) {
        const response = await this.http.post(`/token/${id}`);
        return response.response.token;
    }

    update = undefined;
}

export default new ChatsAPI();
