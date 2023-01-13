import template from './chat-header.hbs';
import Block from '../../../../utils/Block';

import UserController from './../../../../controllers/UserController';
import ChatController from './../../../../controllers/ChatController';
import { PopupProps } from './../../../../components/popup/popup';
import { debounce } from '../../../../utils/common';

type ChatHeaderProps = {
    selectedChatId?: number;
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
    public static componentName = 'ChatHeader';

    constructor(props: TObj) {
        const chatHeaderProps = {
            addChatAvatar: () => this.refs.addChatAvatarPopup.toggleVisibility(),
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
                {
                    text: 'Удалить чат',
                    class: 'remove-icon',
                    onClick: () => ChatController.delete(this.props.selectedChatId!),
                },
            ],
            addUserToChatPopup: {
                ref: 'addUserToChatPopup',
                innerComponentName: 'FoundUsersList',
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
            },
            removeUserPopup: {
                ref: 'removeUserPopup',
                innerComponentName: 'FoundUsersList',
                title: 'Удалить пользователя',
                class: 'xl',
                btnText: 'Удалить',
                field: {
                    label: 'Имя пользователя',
                    name: 'serach_user',
                    type: 'text',
                    value: '',
                    isTopLabelPosition: true,
                    onInputField: (e: Event) => debounce(this.onSearchUsers(e), 800),
                },
                onSend: () => ChatController.removeUsersFromChat(),
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
                onSend: (data: FormData) => ChatController.addChatAvatar(this.props.selectedChatId!, data),
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

    async onSearchUsers(e: Event) {
        const searchLogin = (e.target as HTMLInputElement)!.value;
        const userList = await UserController.getUsers(searchLogin);
        const popupProps = this.props.addUserToChatPopup;

        this.refs[popupProps.ref!]
            .refs[popupProps.innerComponentName!]
            .setProps({
                initState: false,
                list: userList,
            });
    }
}
