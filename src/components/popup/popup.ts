import Block from '../../utils/Block';
import template from './popup.hbs';

export default class Popup extends Block {
    constructor(props: any) {
        super({
            ...props,
            events: {
                click: (e: Event) => {
                    if (
                        (e.target as Element).classList.contains('popup__close') ||
                        (e.target as Element).classList.contains('popup__overlay')
                    ) {
                        this.toggleVisibility();
                    }
                },
            },
        });
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
        });
    }
}
