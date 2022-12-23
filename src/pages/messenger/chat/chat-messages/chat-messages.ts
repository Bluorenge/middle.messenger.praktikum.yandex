import template from './chat-messages.hbs';
import Block from '../../../../utils/Block';

import { Message } from './../../../../_models/chat';
import { withStore } from '../../../../utils/Store';
import { StoreEvents } from './../../../../_models/store';

type ChatMessagesProps = {
    messages?: Message[];
};

class ChatMessages extends Block<ChatMessagesProps> {
    public static componentName = 'ChatMessages';

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
            refs: this.refs,
        });
    }

    protected componentDidUpdate(oldProps: ChatMessagesProps, newProps: ChatMessagesProps): boolean {
        setTimeout(() => this.getContent()!.scrollTop = this.getContent()!.scrollHeight, 0);
        return oldProps !== newProps;
    }
}

const withMessages = withStore((state) => ({
    messages: (state.messages || [])[state.selectedChat.id] || [],
}), StoreEvents.MessagesUpdated);

export default withMessages(ChatMessages as typeof Block);
