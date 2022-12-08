import Block from '../../../utils/Block';
import template from './input.hbs';

interface InputProps {
    type: string;
    name: string;
    value?: string;
    accept?: string;
    isDisable?: boolean;
    class?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    onInput?: () => void;
    onChange?: () => void;
}

export default class Input extends Block {
    constructor({ onFocus, onBlur, onInput, onChange, ...props }: InputProps) {
        super({
            ...props,
            events: {
                focus: onFocus,
                blur: onBlur,
                input: onInput,
                change: onChange,
            },
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
