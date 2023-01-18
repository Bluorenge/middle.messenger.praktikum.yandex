import template from './chat-header.hbs';
import Block from '../../../../utils/Block';

import UserController from './../../../../controllers/UserController';
import ChatController from './../../../../controllers/ChatController';
import { PopupProps } from './../../../../components/popup/popup';
import { debounce } from '../../../../utils/common';
import { SelectedChat } from './../../../../_models/chat';

type ChatHeaderProps = {
    selectedChat: SelectedChat;
    chatTitle: string;
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
    public static componentName = 'ChatHeader';

    constructor(props: any) {
        let adminActions = [
            {
                text: 'Добавить пользователя',
                class: 'add-icon',
                onClick: () => this.refs.addUserToChatPopup.show(),
            },
            {
                text: 'Удалить пользователя',
                class: 'remove-icon',
                onClick: () => this.onRemoveUserPopupOpen(),
            },
            {
                text: 'Удалить чат',
                class: 'remove-icon',
                onClick: () => ChatController.delete(this.props.selectedChat.id),
            },
        ];
        if (props.selectedChat.users.length === 0) {
            adminActions = adminActions.filter(action => action.text !== 'Удалить пользователя');
        }

        const chatHeaderProps = {
            addChatAvatar: () => this.refs.addChatAvatarPopup.toggleVisibility(),
            adminActions,
            addUserToChatPopup: {
                ref: 'addUserToChatPopup',
                innerComponentName: 'UsersList',
                title: 'Добавить пользователя',
                class: 'xl',
                btnText: 'Добавить',
                field: {
                    label: 'Поиск пользователей',
                    name: 'serach_user',
                    type: 'text',
                    value: '',
                    autocomplete: 'off',
                    isTopLabelPosition: true,
                    onInputField: (e: Event) => debounce(this.onSearchUsers(e), 800),
                },
                onSend: () => ChatController.addUsersToChat(),
            },
            removeUserPopup: {
                ref: 'removeUserPopup',
                innerComponentName: 'UsersList',
                title: 'Удалить пользователя',
                class: 'xl',
                btnText: 'Удалить',
                onSend: () => ChatController.removeUserFromChat(),
            },
            addChatAvatarPopup: {
                ref: 'addChatAvatarPopup',
                title: 'Добавить аватар для чата',
                btnText: 'Добавить',
                field: {
                    label: 'Выбрать файл на компьютере',
                    name: 'avatar',
                    type: 'file',
                    value: '',
                    class: 'field--file',
                    accept: 'image/*',
                },
                onSend: (data: FormData) => ChatController.addChatAvatar(this.props.selectedChat.id, data),
            },
            onOpenActionPopupBtnClick: () => this.refs.actionPopup.toggleVisibility(),
        };

        super({ ...props, ...chatHeaderProps });
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
            refs: this.refs,
        });
    }

    onRemoveUserPopupOpen() {
        this.refs.removeUserPopup
            .refs.UsersList.setProps({
                list: this.props.selectedChat.users,
            });
        this.refs.removeUserPopup.show();
    }

    async onSearchUsers(e: Event) {
        // Чтобы не происходил поиск при потере фокуса
        if (e.type === 'blur') {
            return;
        }
        const searchLogin = (e.target as HTMLInputElement)!.value;
        const userList = await UserController.getFoundUsers(searchLogin, this.props.selectedChat.users);
        const popupProps = this.props.addUserToChatPopup;

        this.refs[popupProps.ref!]
            .refs[popupProps.innerComponentName!]
            .setProps({
                initState: false,
                list: userList,
            });
    }
}
