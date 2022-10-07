import template from './message.hbs';
import Block from '../../../../utils/Block';

export default class Message extends Block {
    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
        });
    }
}
