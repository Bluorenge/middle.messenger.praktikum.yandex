import template from './chat.hbs';
import Block from '../../../utils/Block';

import { SelectedChat } from './../../../_models/chat';
import { StoreEvents } from './../../../_models/store';
import { withStore } from './../../../utils/Store';

import { registerComponent } from '../../../utils/hbsHelpers';
// @ts-ignore
import components from './*/*.ts';
Object.entries(components).forEach(([key, value]: any) => registerComponent(value[key].default));

type ChatProps = {
    selectedChat: SelectedChat;
    currentUserId: number;
};

class Chat extends Block<ChatProps> {
    public static componentName = 'Chat';

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
            refs: this.refs,
        });
    }
}

const withMessages = withStore((state) => ({
    selectedChat: state.selectedChat,
    currentUserId: state.currentUser.id,
}), StoreEvents.SelectedChatUpdated);

export default withMessages(Chat as typeof Block);
