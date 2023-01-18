import template from './messenger.hbs';
import Block from '../../utils/Block';
import lens from '../../../static/img/svg/lens.svg';
import { PopupProps } from './../../components/popup/popup';

import ChatController from './../../controllers/ChatController';
import { withStore } from '../../utils/Store';
import { debounce } from '../../utils/common';

import { registerComponent } from '../../utils/hbsHelpers';
const context = require.context('./', true, /^.*\/(?!.*test).*\.ts$/);
const components = context.keys().map(key => context(key));
components.forEach((item: any) => registerComponent(item.default));

type MessengerProps = {
    accountAvatar: string;
    searchFieldIcon: string;
    onCreateChatBtnClick?: () => void;
    createChatPopup: PopupProps;
};

class Messenger extends Block<MessengerProps> {
    public static componentName = 'Messenger';

    constructor(props: MessengerProps) {
        const messengerProps = {
            accountAvatar: props.accountAvatar ?? '',
            searchFieldIcon: lens,
            onInputSearchChat:  (e: Event) => debounce(this.onInputSearchChat(e), 800),
            onCreateChatBtnClick: () =>
                this.refs[this.props.createChatPopup.ref!].show(),
            createChatPopup: {
                title: 'Название чата',
                btnText: 'Создать чат',
                field: {
                    label: 'Имя чата',
                    name: 'search_user',
                    type: 'text',
                    isTopLabelPosition: true,
                },
                onSend: (formData: FormData) => this.onSendBtnForCreateChatClick(formData),
                ref: 'createChatPopup',
            },
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

    onSendBtnForCreateChatClick(formData: FormData) {
        const newChatName = this.props.createChatPopup.field!.name;
        ChatController.create(formData.get(newChatName) as string);
        this.refs[this.props.createChatPopup.ref!].hide();
    }

    onInputSearchChat(e: Event) {
        const searchTitle = (e.target as HTMLInputElement)!.value;
        ChatController.setFoundChats(searchTitle);
    }
}

const withChatList = withStore((state) => ({
    accountAvatar: state.currentUser.avatar,
}));

export default withChatList(Messenger as typeof Block);
