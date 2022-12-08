import template from './messenger.hbs';
import Block from '../../utils/Block';
import lens from '../../../static/img/svg/lens.svg';
import { PopupProps } from './../../components/popup/popup';

import ChatController from './../../controllers/ChatController';
import { ChatOfList, withStore } from '../../utils/Store';
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
    chatList: ChatOfList[];
    createChatPopup: PopupProps
    onCreateChatBtnClick?: () => void;
};

class Messenger extends Block<MessengerProps> {
    constructor(props: MessengerProps) {
        const messengerProps = {
            accountAvatar: props.accountAvatar ?? '',
            searchFieldIcon: lens,
            chatList: props.chatList,
            createChatPopup: {
                title: 'Поиск пользователей',
                btnText: 'Начать чат',
                field: {
                    label: 'Поиск пользователей',
                    name: 'serach_user',
                    type: 'text',
                    value: '',
                    isTopLabelPosition: true,
                },
            },
        };
        super(messengerProps);

        this.setProps({
            ...props,
            onCreateChatBtnClick: this.onCreateChatBtnClick.bind(this),
        });
    }

    init() {
        ChatController.fetchChats();

        this.props.createChatPopup.field.onInputField =
            debounce(this.onSearchUsers.bind(this));
        this.props.createChatPopup.onSend =
            this.onSendBtnClick.bind(this);
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
        console.log('e: ', e);
    }

    onSendBtnClick(data: FormData) {
        console.log('data: ', data);
    }
}

export const withChatList = withStore((state) => ({
    accountAvatar: state.currentUser.avatar,
    chatList: [...(state.chatList || [])],
}));

export default withChatList(Messenger as typeof Block);
