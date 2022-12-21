import template from './action-popup.hbs';
import Block from '../../../../utils/Block';

type ActionPopupProps = {
    position: string;
    actions: {
        text: string;
        class: string;
        onClick: () => void;
    }
    ref: string;
};

export default class ActionPopup extends Block<ActionPopupProps> {
    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
        });
    }
}
