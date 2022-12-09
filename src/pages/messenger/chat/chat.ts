import template from './chat.hbs';
import Block from '../../../utils/Block';
import store, { StoreData, StoreEvents } from './../../../utils/Store';
import { isEqual } from '../../../utils/common';
import dateFormater from '../../../utils/dateFormatter';

import { registerComponent } from '../../../utils/hbsHelpers';
// @ts-ignore
import components from './*/*.ts';

Object.entries(components).forEach(([key, value]: any) =>
    registerComponent(value[key].default),
);

export default class Chat extends Block {
    constructor() {
        let state = mapStateToProps(store.getState());
        super({ ...state });
        // Подписываемся здесь, потому что компонент регается без HOC
        store.on(StoreEvents.MessagesUpdated, () => {
            const newState = mapStateToProps(store.getState());

            if (!!newState.selectedChat && !isEqual(state, newState)) {
                for (const mess of newState.messages as any) {
                    mess.date = null;
                }
                for (const mess of newState.messages as any) {
                    const dateMessage = dateFormater(mess.time);

                    if (!(newState.messages as any).find((i: any) => i.date === dateMessage)) {
                        mess.date = dateMessage;
                    }
                }
                state = newState;
                this.setProps({
                    ...newState,
                });
            }
        });
    }

    onScroll(e: any) {
        console.log('e: ', e);
    }

    render() {
        this.element?.querySelector('.chat__content')?.addEventListener('scroll', this.onScroll);
        console.count('label');

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
            messages: [],
            selectedChat: undefined,
            currentUserId: state.currentUser.id,
        };
    }

    return {
        messages: (state.messages || [])[selectedChatId] || [],
        selectedChat: state.selectedChat,
        currentUserId: state.currentUser.id,
    };
}
