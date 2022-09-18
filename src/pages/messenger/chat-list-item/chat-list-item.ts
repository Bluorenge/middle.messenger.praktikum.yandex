import template from './chat-list-item.hbs';
import Block from '../../../utils/Block';

export default class ChatListItem extends Block {
    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
        });
    }
}
