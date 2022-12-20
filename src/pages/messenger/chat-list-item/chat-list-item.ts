import template from './chat-list-item.hbs';
import Block from '../../../utils/Block';
import { withStore } from '../../../utils/Store';
import ChatController from './../../../controllers/ChatController';
import dateFormater from '../../../utils/dateFormatter';
import { StoreEvents } from './../../../_models/store';

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

class ChatListItem extends Block<ChatListItemProps> {
    public static componentName = 'ChatListItem';

    constructor({ chatData: { last_message: last_message, ...props } }: any) {
        const chatListItemProps = {
            time: dateFormater(last_message?.time, true),
            login: last_message?.user.login || null,
            content: last_message?.content ?? '',
            events: {
                click: () => {
                    ChatController.selectChat(this.props.id, this.props.title, this.props.avatar);
                },
            },
        };

        super({ ...chatListItemProps, ...props });
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
        });
    }
}

// * потому что конкретно эти пропсы стора записываются один раз, а чатов может быть больше
const isForceSetProps = true;

const withSelectedChat = withStore((state) => ({
    currentUserLogin: state.currentUser.login,
    selectedChat: state.selectedChat,
}), StoreEvents.SelectedChatUpdated, isForceSetProps);


export default withSelectedChat(ChatListItem as typeof Block);
