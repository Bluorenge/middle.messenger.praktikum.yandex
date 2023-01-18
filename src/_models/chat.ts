import { User } from './user';

export interface ChatsOption {
    offset?: number;
    limit?: number;
    title?: string;
}

export interface ChatUsersOption {
    id: number;
    offset?: number;
    limit?: number;
    name?: string;
    email?: string;
}

export interface ChatData {
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

export type ChatUser = User & {
    role: string;
};

export interface Token {
    token: string;
}

export interface DeletedChatData {
    userId: number;
    result: {
        id: number;
        title: string;
        avatar: string;
    }
}

export interface DeleteUserFromChatOption {
    chatId: number;
    users: number[];
}

export interface Message {
    chat_id: number;
    time: string;
    type: string;
    user_id: number;
    content: string;
    file?: {
        id: number;
        user_id: number;
        path: string;
        filename: string;
        content_type: string;
        content_size: number;
        upload_date: string;
    }
}

export interface SelectedChat {
    id: number;
    title: string;
    avatar: string | null;
    users?: ChatUser[];
}
