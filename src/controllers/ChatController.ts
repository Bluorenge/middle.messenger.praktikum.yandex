import ChatsAPI from '../api/ChatsApi';
import store from '../utils/Store';
import MessagesController from './MessagesController';

import { ChatData } from './../_models/chat';
import { StoreEvents } from './../_models/store';
import { User } from './../_models/user';

export class ChatController {
    private api = new ChatsAPI();

    public async create(title: string) {
        await this.api.create(title);

        this.fetchChats();
    }

    public async fetchChats() {
        const chats = await this.api.read();

        chats.map(async (chat: ChatData) => {
            const token = await this.getToken(chat.id);

            await MessagesController.connect(chat.id, token);
        });
        store.set('chatList', chats);
    }

    public async delete(id: number) {
        await this.api.delete(id);

        this.fetchChats();
    }

    public addUsersToChat() {
        const selectChatId = store.getState().selectedChat.id;
        const selectedUserId = store.getState().selectedUser.id;

        this.api.addUsers(selectChatId, [selectedUserId]);
    }

    public removeUsersFromChat() {
        const selectChatId = store.getState().selectedChat.id;
        const selectedUserId = store.getState().selectedUser.id;

        this.api.deleteUsers(selectChatId, [selectedUserId]);
    }

    public getToken(id: number) {
        return this.api.getToken(id);
    }

    public setSelectedChat(id: number, title: string, avatar: string | null) {
        store.set('selectedChat', { id, title, avatar }, StoreEvents.SelectedChatUpdated);
    }

    public setSelectedUsers(login: string) {
        const selectedUser = store.getState().foundUsers.find((i: User) => i.login === login).id;

        store.set('selectedUser', selectedUser);
    }
}

export default new ChatController();
