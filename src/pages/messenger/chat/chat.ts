import template from './chat.hbs';
import Block from '../../../utils/Block';
import { withStore } from './../../../utils/Store';

import { PopupProps } from './../../../components/popup/popup';
import { Message } from './../../../_models/chat';
import { StoreData, StoreEvents } from './../../../_models/store';

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
        });
    }

    protected componentDidUpdate(oldProps: ChatProps, newProps: ChatProps): boolean {
        if (!this.props.selectedChat) {
            return false;
        }
        return oldProps !== newProps;
    }
}

function mapStateToProps(state: StoreData) {
    const selectedChatId = state.selectedChat;

    if (!selectedChatId) {
        return {
            messages: [],
            selectedChat: undefined,
            currentUserId: state.currentUser.id,
        };
    }

    return {
        messages: (state.messages || [])[selectedChatId.id] || [],
        selectedChat: state.selectedChat,
        currentUserId: state.currentUser.id,
    };
}

const withMessages = withStore(mapStateToProps, [StoreEvents.SelectedChatUpdated, StoreEvents.MessagesUpdated], true);

export default withMessages(Chat as typeof Block);
