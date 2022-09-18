import template from './chat-header.hbs';
import Block from '../../../../utils/Block';

export default class ChatHeader extends Block {
    constructor(props: TObj) {
        super({
            ...props,
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
        });

        this.setProps({
            events: {
                click: (e: Event) => {
                    if ((e.target as Element).closest('.open-sm-popup')) {
                        this.refs.actionPopup.toggleVisibility();
                    }
                },
            },
        });
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
            refs: this.refs,
        });
    }
}
