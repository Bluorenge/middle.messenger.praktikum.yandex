import template from './chat-messages.hbs';
import Block from '../../../../utils/Block';

import { Message } from './../../../../_models/chat';
import { withStore } from '../../../../utils/Store';
import { StoreEvents } from './../../../../_models/store';

import { registerComponent } from '../../../../utils/hbsHelpers';
// @ts-ignore
import components from './*/*.ts';
Object.entries(components).forEach(([key, value]: any) => registerComponent(value[key].default));

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

    protected componentDidMount(): void {
        this.getContent()!.scrollTop = this.getContent()!.scrollHeight;
    }

    protected componentDidUpdate() {
        this.getContent()!.scrollTop = this.getContent()!.scrollHeight;
    }
}

const withMessages = withStore((state) => ({
    messages: (state.messages || [])[state.selectedChat.id] || [],
}), StoreEvents.MessagesUpdated);

export default withMessages(ChatMessages as typeof Block);
