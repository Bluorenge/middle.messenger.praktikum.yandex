import template from './chat-list-item.hbs';
import Block from '../../../../utils/Block';
import ChatController from '../../../../controllers/ChatController';
import dateFormater from '../../../../utils/dateFormatter';

type ChatListItemProps = {
    currentUserLogin?: string;
    selectedChat?: number;
    id: number;
    avatar: string | null;
    title: string;
    unread_count: number | null;
    time: string | null;
    login: string | undefined;
    content: string;
    events: {
        click: () => void;
    }
};

export default class ChatListItem extends Block<ChatListItemProps> {
    public static componentName = 'ChatListItem';

    constructor({
        chatData: {
            last_message: last_message,
            ...propsChat
        },
        ...props
    }: any) {
        const chatListItemProps = {
            time: dateFormater(last_message?.time, 'chatList'),
            login: last_message?.user.login || null,
            content: last_message?.content ?? '',
            events: {
                click: () => this.onClick(),
            },
        };

        super({ ...chatListItemProps, ...propsChat, ...props });
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
        });
    }

    async onClick() {
        ChatController.setSelectedChat({
            id: this.props.id,
            title: this.props.title,
            avatar: this.props.avatar,
        });
    }
}
