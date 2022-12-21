import template from './chat-header.hbs';
import Block from '../../../../utils/Block';

import UserController from './../../../../controllers/UserController';
import ChatController from './../../../../controllers/ChatController';
import { PopupProps } from './../../../../components/popup/popup';
import { debounce } from '../../../../utils/common';

type ChatHeaderProps = {
    chatTitle?: string;
    chatAvatar?: string | null;
    adminActions: {
        text: string;
        class: string;
        onClick: () => void;
    }[];
    addUserToChatPopup: PopupProps;
    removeUserPopup: PopupProps;
    onOpenActionPopupBtnClick: () => void;
};

export default class ChatHeader extends Block<ChatHeaderProps> {
    constructor(props: TObj) {
        const chatHeaderProps = {
            adminActions: [
                {
                    text: 'Добавить пользователя',
                    class: 'add-icon',
                    onClick: () => this.refs.addUserToChatPopup.show(),
                },
                {
                    text: 'Удалить пользователя',
                    class: 'remove-icon',
                    onClick: () => this.refs.removeUserPopup.show(),
                },
            ],
            addUserToChatPopup: {
                innerComponentName: 'found-users-list',
                title: 'Добавить пользователя',
                class: 'xl',
                btnText: 'Добавить',
                field: {
                    label: 'Поиск пользователей',
                    name: 'serach_user',
                    type: 'text',
                    value: '',
                    isTopLabelPosition: true,
                    onInputField: (e: Event) => debounce(this.onSearchUsers(e), 800),
                },
                onSend: () => ChatController.addUsersToChat(),
                ref: 'addUserToChatPopup',
            },
            removeUserPopup: {
                innerComponentName: 'found-users-list',
                title: 'Удалить пользователя',
                class: 'xl',
                btnText: 'Удалить',
                field: {
                    label: 'Имя пользователя',
                    name: 'serach_user',
                    type: 'text',
                    value: '',
                    isTopLabelPosition: true,
                    onInputField: (e: Event) => debounce(this.onSearchUsers(e)),
                },
                onSend: () => ChatController.removeUsersFromChat(),
                ref: 'removeUserPopup',
            },
            onOpenActionPopupBtnClick: () => this.refs.actionPopup.toggleVisibility(),
        };

        super({ ...props, ...chatHeaderProps });
    }

    render() {
        console.count('chatHeaderRender');
        return this.compile(template, {
            ...this.props,
            children: this.children,
            refs: this.refs,
        });
    }

    onSearchUsers(e: Event) {
        const searchLogin = (e.target as HTMLInputElement)!.value;
        UserController.getUsers(searchLogin);
    }
}
