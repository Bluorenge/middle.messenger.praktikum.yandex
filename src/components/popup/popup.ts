import Block from '../../utils/Block';
import template from './popup.hbs';

export type PopupProps = {
    title: string;
    btnText: string;
    field: Field;
    class?: string;
    innerComponentName?: string;
    onBtnClick?: (e: Event) => void;
    onSend?: (data: FormData) => void;
    events?: {
        click: (e: Event) => void;
    }
};

export default class Popup extends Block<PopupProps> {
    constructor(props: PopupProps) {
        super({
            ...props,
            onBtnClick: (e: Event) => {
                e.preventDefault();
                const form = this.getContent()?.querySelector('form');

                if (form && props.onSend) {
                    const formData = new FormData(form);
                    props.onSend(formData as any);
                }
            },
            events: {
                click: (e: Event) => {
                    const targetEl = (e.target as Element);
                    const isCloseElementsClick = targetEl.classList.contains('popup__close') || targetEl.classList.contains('popup__overlay');

                    if (isCloseElementsClick) {
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
