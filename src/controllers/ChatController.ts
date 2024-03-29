import ChatsAPI from '../api/ChatsApi';
import store from '../utils/Store';
import MessagesController from './MessagesController';

import { ChatData, SelectedChat } from './../_models/chat';
import { StoreEvents } from './../_models/store';
import UserController from './UserController';

export class ChatController {
    private api = new ChatsAPI();

    public async create(title: string) {
        await this.api.create(title);

        this.fetchChats();
    }

    public async fetchChats() {
        let chats: any;

        try {
            chats = await this.api.read();

            const reasonText = chats.reason;

            if (reasonText) {
                throw new Error(reasonText);
            }

            chats.map(async (chat: ChatData) => {
                const token = await this.getToken(chat.id);

                await MessagesController.connect(chat.id, token);
            });

            delete store.getState().chatList;
            this.trimTextAndSortChats(chats);
            store.set('chatList', chats, StoreEvents.ChatListUpdated);
        } catch (error) {
            console.log(error);
        }
    }

    public async delete(id: number) {
        await this.api.delete(id);

        this.fetchChats();
        store.set('selectedChat', null, StoreEvents.SelectedChatUpdated);
    }

    public addUsersToChat() {
        this.updateSelectedChatUser('addUsers');
    }

    public removeUserFromChat() {
        this.updateSelectedChatUser('deleteUsers');
    }

    public getToken(id: number) {
        return this.api.getToken(id);
    }

    public async setSelectedChat(chatData: SelectedChat) {
        const selectedChat = {
            id: chatData.id,
            title: chatData.title,
            avatar: chatData.avatar,
            users: await this.getChatUsers(chatData.id),
        };
        delete store.getState().selectedChat;
        store.set('selectedChat', selectedChat, StoreEvents.SelectedChatUpdated);
    }

    public async setSelectedUsers(login: string) {
        const selectedUser = await UserController.getFoundUsers(login);

        store.set('selectedUser', selectedUser![0]);
    }

    public async addChatAvatar(id: number, avatarFormData: FormData) {
        avatarFormData.append('chatId', id.toString());
        const { avatar } = await this.api.addChatAvatar(avatarFormData);

        await this.fetchChats();
        store.set('selectedChat.avatar', avatar, StoreEvents.SelectedChatUpdated);
    }

    public async setFoundChats(title: string) {
        await this.fetchChats();

        if (!title) {
            return;
        }

        const chatList = store.getState().chatList;
        const foundChats = chatList.filter((chat: ChatData) => chat.title.includes(title));

        delete store.getState().chatList;
        store.set('chatList', foundChats, StoreEvents.ChatListUpdated);
    }

    private async updateSelectedChatUser(type: 'addUsers' | 'deleteUsers') {
        const selectChatId = store.getState().selectedChat.id;
        const selectedUserId = store.getState().selectedUser.id;

        await this.api[type](selectChatId, [selectedUserId]);

        const selectedChatUser = await this.getChatUsers(selectChatId);
        delete store.getState().selectedChat.users;
        store.set('selectedChat.users', selectedChatUser, StoreEvents.SelectedChatUpdated);
    }

    private async getChatUsers(idChat: number) {
        const chatUsers = await this.api.getUsers({ id: idChat });
        const currentUserId = store.getState().currentUser.id;
        const chatUsersWithoutCurrentUser = chatUsers.filter(user => user.id !== currentUserId);

        return chatUsersWithoutCurrentUser;
    }

    private trimTextAndSortChats(chats: ChatData[]) {
        if (chats.length === 0) {
            return;
        }

        for (const chat of chats) {
            const title = chat.title;
            if (title && title.length > 25) {
                chat.title = title.slice(0, 24) + '…';
            }

            const message = chat.last_message?.content;
            if (message && message.length > 20) {
                chat.last_message.content = message.slice(0, 19) + '…';
            }
        }
        chats.sort((a, b) =>
            Number(new Date(b.last_message?.time)) - Number(new Date(a.last_message?.time)),
        );
    }
}

export default new ChatController();
