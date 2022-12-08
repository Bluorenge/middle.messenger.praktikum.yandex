import Block from '../../utils/Block';
import template from './button.hbs';

interface ButtonProps {
    text: string;
    class?: string;
    onClick?: () => void;
}

export default class Button extends Block {
    constructor({ onClick, ...props }: ButtonProps) {
        super({ ...props, events: { click: onClick } });
    }

    render() {
        return this.compile(template, this.props);
    }
}
