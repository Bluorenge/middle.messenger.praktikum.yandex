import template from './action-popup.hbs';
import Block from '../../../../utils/Block';

export default class ActionPopup extends Block {
    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
        });
    }
}
