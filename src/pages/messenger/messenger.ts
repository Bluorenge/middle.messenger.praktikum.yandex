import template from './messenger.hbs';
import Block from '../../utils/Block';
import lens from '../../../static/img/svg/lens.svg';
import { PopupProps } from './../../components/popup/popup';

import ChatController from './../../controllers/ChatController';
import store, { withStore } from '../../utils/Store';
import UserController from './../../controllers/UserController';
import { ChatData } from '../../_models/chat';
import { debounce } from '../../utils/common';

import { registerComponent } from '../../utils/hbsHelpers';
// @ts-ignore
import components from './*/*.ts';

Object.entries(components).forEach(([key, value]: any) =>
    registerComponent(value[key].default),
);

type MessengerProps = {
    accountAvatar: string;
    searchFieldIcon: string;
    chatList: ChatData[];
    createChatPopup: PopupProps
    onCreateChatBtnClick?: () => void;
};

class Messenger extends Block<MessengerProps> {
    constructor(props: MessengerProps) {
        console.count('Messenger');
        const messengerProps = {
            accountAvatar: props.accountAvatar ?? '',
            searchFieldIcon: lens,
            chatList: props.chatList,
            createChatPopup: {
                innerComponentName: 'found-users-list',
                class: 'xl',
                title: 'Поиск пользователей',
                btnText: 'Начать чат',
                field: {
                    label: 'Поиск пользователей',
                    name: 'serach_user',
                    type: 'text',
                    value: '',
                    isTopLabelPosition: true,
                    onInputField: (e: Event) => debounce(this.onSearchUsers(e)),
                },
                onSend: () => this.onSendBtnForCreateChatClick(),
            },
            onCreateChatBtnClick: () => this.onCreateChatBtnClick(),
        };
        super(messengerProps);
    }

    init() {
        ChatController.fetchChats();
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
            refs: this.refs,
        });
    }

    onCreateChatBtnClick() {
        const popup = document.querySelector('.popup');

        if (popup) {
            popup.classList.toggle('hidden');
        }
    }

    onSearchUsers(e: Event) {
        const searchLogin = (e.target as HTMLInputElement)!.value;
        UserController.getUsers(searchLogin);
    }

    onSendBtnForCreateChatClick() {
        ChatController.create();
    }
}

export const withChatList = withStore((state) => ({
    accountAvatar: state.currentUser.avatar,
    chatList: [...(state.chatList || [])],
}));

export default withChatList(Messenger as typeof Block);
