import { ChatData, Message, SelectedChat } from './chat';
import { User } from './user';

export enum StoreEvents {
    Updated = 'updated',
    MessagesUpdated = 'messages-updated',
    SelectedChatUpdated = 'selectedChat-updated',
    FoundUsersUpdated = 'foundUsers-updated',
    ChatListUpdated = 'chatList-updated',
}

export interface StoreData {
    currentUser: User;
    registerProps: TObj;
    loginProps: TObj;
    accountProps: TObj;
    chatList: ChatData[];
    messages: Message[];
    selectedChat: SelectedChat;
    selectedUser: number;
}
