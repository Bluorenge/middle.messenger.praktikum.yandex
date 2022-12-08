import API, { ChatsAPI } from '../api/ChatsApi';
import store, { ChatOfList, StoreEvents } from '../utils/Store';
import MessagesController from './MessagesController';

export class ChatController {
    private readonly api: ChatsAPI;

    constructor() {
        this.api = API;
    }

    async create(title: string) {
        await this.api.create(title);

        this.fetchChats();
    }

    async delete(id: number) {
        await this.api.delete(id);

        this.fetchChats();
    }

    async fetchChats() {
        const chats = await this.api.read();
        const chatsData = chats.response;

        chatsData.map(async (chat: ChatOfList) => {
            const token = await this.getToken(chat.id);

            await MessagesController.connect(chat.id, token);
        });
        store.set('chatList', chatsData);
    }

    addUserToChat(id: number, userId: number) {
        this.api.addUsers(id, [userId]);
    }

    getToken(id: number) {
        return this.api.getToken(id);
    }

    selectChat(id: number) {
        store.set('selectedChat', id);
        store.emit(StoreEvents.MessagesUpdated);
    }
}

export default new ChatController();
