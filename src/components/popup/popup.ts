import Block from '../../utils/Block';
import template from './popup.hbs';

export type PopupProps = {
    title: string;
    btnText: string;
    field?: Field;
    class?: string;
    innerComponentName?: string;
    onBtnClick?: (e: Event) => void;
    onSend?: (data: FormData) => void;
    events?: {
        click: (e: Event) => void;
    },
    ref?: string;
};

export default class Popup extends Block<PopupProps> {
    public static componentName = 'Popup';

    constructor(props: PopupProps) {
        const popupProps = {
            onBtnClick: (e: Event) => this.onBtnClick(e),
            events: {
                click: (e: Event) => this.onClick(e),
            },
        };

        super({ ...props, ...popupProps });
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
            refs: this.refs,
        });
    }

    onBtnClick(e: Event) {
        e.preventDefault();
        const form = this.getContent()?.querySelector('form');

        if (form && this.props.onSend) {
            const formData = new FormData(form);
            this.props.onSend(formData as any);
        }
    }

    onClick(e: Event) {
        const targetEl = (e.target as Element);
        const isCloseElementsClick = targetEl.classList.contains('popup__close') || targetEl.classList.contains('popup__overlay');

        if (isCloseElementsClick) {
            this.toggleVisibility();
        }
    }
}
