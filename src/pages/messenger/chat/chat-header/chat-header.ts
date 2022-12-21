import template from './chat-header.hbs';
import Block from '../../../../utils/Block';

type ChatHeaderProps = {
    chatTitle?: string;
    chatAvatar?: string | null;
    adminActions: {
        text: string;
        class: string;
    }[];
    events: {
        click: (e: Event) => void;
    }
};

export default class ChatHeader extends Block<ChatHeaderProps> {
    constructor(props: TObj) {
        const chatHeaderProps = {
            adminActions: [
                {
                    text: 'Добавить пользователя',
                    class: 'add-icon',
                },
                {
                    text: 'Удалить пользователя',
                    class: 'remove-icon',
                },
            ],
            events: {
                click: (e: Event) => {
                    if ((e.target as Element).closest('.open-sm-popup')) {
                        this.refs.actionPopup.toggleVisibility();
                    }
                },
            },
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
}
