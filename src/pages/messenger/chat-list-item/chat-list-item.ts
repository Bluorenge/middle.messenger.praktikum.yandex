import template from './chat-list-item.hbs';
import Block from '../../../utils/Block';
import store, { StoreData, StoreEvents } from '../../../utils/Store';
import ChatController from './../../../controllers/ChatController';
import dateFormater from '../../../utils/dateFormatter';
import { isEqual } from '../../../utils/common';

type ChatListItemProps = {
    currentUserLogin: string;
    selectedChat: number;
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
    constructor({ chatData }: any) {
        const chatListItemProps = {
            id: chatData.id,
            avatar: chatData.avatar,
            title: chatData.title,
            unread_count: chatData.unread_count,
            time: dateFormater(chatData.last_message?.time),
            login: chatData.last_message?.user.login,
            content: chatData.last_message?.content ?? '',
            events: {
                click: () => {
                    ChatController.selectChat(chatData.id);
                },
            },
        };

        const mapStateToProps = (state: StoreData) => ({
            currentUserLogin: state.currentUser.login,
            selectedChat: state.selectedChat,
        });
        let state = mapStateToProps(store.getState());

        super({ ...chatListItemProps, ...state });

        // Подписываемся здесь, потому что компонент регается без HOC
        store.on(StoreEvents.Updated, () => {
            const newState = mapStateToProps(store.getState());

            if (!isEqual(state, newState)) {
                state = newState;
                this.setProps({
                    ...chatListItemProps,
                    ...newState,
                });
            }
        });
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
        });
    }
}
