import template from './chat.hbs';
import Block from '../../../utils/Block';
import store, { StoreData, StoreEvents } from './../../../utils/Store';
import { isEqual } from '../../../utils/common';

import { registerComponent } from '../../../utils/hbsHelpers';
// @ts-ignore
import components from './*/*.ts';

Object.entries(components).forEach(([key, value]: any) =>
    registerComponent(value[key].default),
);

export default class Chat extends Block {
    constructor(props: TObj) {
        let state = mapStateToProps(store.getState());
        super({ ...props, ...state });
        // Подписываемся здесь, потому что компонент регается без HOC
        store.on(StoreEvents.MessagesUpdated, () => {
            const newState = mapStateToProps(store.getState());

            if (!!newState.selectedChat && !isEqual(state, newState)) {
                state = newState;
                this.setProps({
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

function mapStateToProps(state: StoreData) {
    const selectedChatId = state.selectedChat;

    if (!selectedChatId) {
        return {
            messages: {},
            selectedChat: undefined,
            currentUserId: state.currentUser.id,
        };
    }

    return {
        messages: (state.messages || {})[selectedChatId] || {},
        selectedChat: state.selectedChat,
        currentUserId: state.currentUser.id,
    };
}
