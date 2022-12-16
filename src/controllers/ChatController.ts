import ChatsAPI from '../api/ChatsApi';
import store, { StoreEvents } from '../utils/Store';
import MessagesController from './MessagesController';
import { ChatData } from './../_models/chat';

export class ChatController {
    private api = new ChatsAPI();

    public async create(title = store.getState().selectUserForCreateChat) {
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

    public addUserToChat(id: number, userId: number) {
        this.api.addUsers(id, [userId]);
    }

    public getToken(id: number) {
        return this.api.getToken(id);
    }

    public selectChat(id: number) {
        store.set('selectedChat', id);
        store.emit(StoreEvents.MessagesUpdated);
    }

    public selectUserForCreateChat(login: string) {
        store.set('selectUserForCreateChat', login);
    }
}

export default new ChatController();
