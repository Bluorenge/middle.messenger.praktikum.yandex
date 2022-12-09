import Block from '../../../utils/Block';
import template from './account-header.hbs';
import mockAvatarImg from '../../../../static/img/svg/photo.svg';

export default class AccountHeader extends Block {
    constructor({ avatar, ...props }: TObj) {
        if (!props.avatar) {
            props.avatar = mockAvatarImg;
        }

        super({
            ...props,
            userAvatar: !!avatar,
            avatar: avatar ?? mockAvatarImg,
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
