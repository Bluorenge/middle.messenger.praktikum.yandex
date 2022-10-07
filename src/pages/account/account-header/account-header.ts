import Block from '../../../utils/Block';
import template from './account-header.hbs';
import mockAccountImg from '../../../../static/img/svg/photo.svg';

export default class AccountImg extends Block {
    constructor(props: TObj) {
        if (!props.accountImg) {
            props.accountImg = mockAccountImg;
        }

        super({
            ...props,
            events: {
                click: (e: Event) => {
                    if ((e.target as Element).closest('.open-popup')) {
                        const popup = document.querySelector('.popup');
                        if (popup) {
                            popup.classList.toggle('hidden');
                        }
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
