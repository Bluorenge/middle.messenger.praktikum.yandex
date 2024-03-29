import BaseAPI from './BaseApi';
import { ChatData, ChatsOption, DeletedChatData, ChatUsersOption, ChatUser, Token } from './../_models/chat';

export default class ChatsAPI extends BaseAPI {
    constructor() {
        super('/chats');
    }

    read(options?: ChatsOption): Promise<ChatData[]> {
        return this.http.get('', {
            data: options,
        });
    }

    create(title: string) {
        return this.http.post('', {
            data: { title },
        });
    }

    delete(id: number): Promise<DeletedChatData> {
        return this.http.delete('', {
            data: { chatId: id },
        });
    }

    getUsers(params: ChatUsersOption): Promise<ChatUser[]> {
        return this.http.get(`/${params.id}/users`);
    }

    addUsers(id: number, users: number[]) {
        return this.http.put('/users', {
            data: { chatId: id, users },
        });
    }

    deleteUsers(id: number, users: number[]) {
        return this.http.delete('/users', {
            data: { chatId: id, users },
        });
    }

    async getToken(id: number): Promise<string> {
        const response: Token = await this.http.post(`/token/${id}`);
        return response?.token;
    }

    addChatAvatar(data: FormData): Promise<ChatData> {
        return this.http.put('/avatar', {
            data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    update = undefined;
}
