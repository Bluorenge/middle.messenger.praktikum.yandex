import ChatsAPI from '../api/ChatsApi';
import store from '../utils/Store';
import MessagesController from './MessagesController';

import { ChatData } from './../_models/chat';
import { StoreEvents } from './../_models/store';
import UserController from './UserController';

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

        delete store.getState().chatList;
        this.trimTextAndSortChats(chats);
        store.set('chatList', chats, StoreEvents.ChatListUpdated);
    }

    private trimTextAndSortChats(chats: ChatData[]) {
        for (const chat of chats) {
            const title = chat.title;
            if (title && title.length > 25) {
                chat.title = title.slice(0, 24) + '…';
            }

            const message = chat.last_message.content;
            if (message && message.length > 20) {
                chat.last_message.content = message.slice(0, 19) + '…';
            }
        }
        chats.sort((a, b) =>
            Number(new Date(b.last_message.time)) - Number(new Date(a.last_message.time)),
        );
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

    public async setSelectedUsers(login: string) {
        const selectedUser = await UserController.getUsers(login);

        store.set('selectedUser', selectedUser![0]);
    }
}

export default new ChatController();
