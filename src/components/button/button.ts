import Block from '../../utils/Block';
import template from './button.hbs';

type ButtonProps = {
    text: string;
    class?: string;
    events: {
        onClick?: () => void;
    };
};

export default class Button extends Block<ButtonProps> {
    public static componentName = 'Button';

    constructor({ onClick, ...props }: any) {
        super({ ...props, events: { click: onClick } });
    }

    render() {
        return this.compile(template, this.props);
    }
}
