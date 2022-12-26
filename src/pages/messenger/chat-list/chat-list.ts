import template from './chat-list.hbs';
import Block from '../../../utils/Block';
import { withStore } from '../../../utils/Store';

import { StoreEvents } from '../../../_models/store';
import { SelectedChat, ChatData } from './../../../_models/chat';
import { isEqual } from '../../../utils/common';

import { registerComponent } from '../../../utils/hbsHelpers';
// @ts-ignore
import components from './*/*.ts';
Object.entries(components).forEach(([key, value]: any) => registerComponent(value[key].default));

type ChatListProps = {
    currentUserLogin: string;
    selectedChat: SelectedChat;
    chatList: ChatData[];
};

class ChatList extends Block<ChatListProps> {
    public static componentName = 'ChatList';

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
        });
    }

    protected componentBeforeUpdate(oldProps: ChatListProps, newProps: ChatListProps): boolean {
        const isNeedUpdate = !isEqual(oldProps, newProps);
        return isNeedUpdate;
    }
}

const withSelectedAndListChat = withStore((state) => ({
    currentUserLogin: state.currentUser.login,
    selectedChat: state.selectedChat,
    chatList: [...(state.chatList || [])],
}), [StoreEvents.SelectedChatUpdated, StoreEvents.ChatListUpdated]);


export default withSelectedAndListChat(ChatList as typeof Block);
