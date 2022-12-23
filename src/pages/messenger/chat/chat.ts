import template from './chat.hbs';
import Block from '../../../utils/Block';

import { PopupProps } from './../../../components/popup/popup';
import { Message } from './../../../_models/chat';
import { StoreEvents } from './../../../_models/store';
import { withStore } from './../../../utils/Store';

import { registerComponent } from '../../../utils/hbsHelpers';
// @ts-ignore
import components from './*/*.ts';

Object.entries(components).forEach(([key, value]: any) =>
    registerComponent(value[key].default),
);

type ChatProps = {
    messages?: Message[];
    selectedChat?: number;
    currentUserId?: number;
    addUserToChatPopup: PopupProps;
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

    protected componentDidUpdate(oldProps: ChatProps, newProps: ChatProps): boolean {
        if (!this.props.selectedChat) {
            return false;
        }
        return oldProps !== newProps;
    }
}

const withMessages = withStore((state) => ({
    selectedChat: state.selectedChat,
    currentUserId: state.currentUser.id,
}), StoreEvents.SelectedChatUpdated);

export default withMessages(Chat as typeof Block);
