import { ChatData, Message, SelectedChat } from './chat';
import { User } from './user';

export enum StoreEvents {
    Updated = 'updated',
    MessagesUpdated = 'messages-updated',
    SelectedChatUpdated = 'selectedChat-updated',
    FoundUsersUpdated = 'foundUsers-updated',
}

export interface StoreData {
    currentUser: User;
    registerProps: TObj;
    loginProps: TObj;
    chatList: ChatData[];
    messages: Message[];
    foundUsers: User[];
    selectedChat: SelectedChat;
    selectedUser: number;
}
