import Block from '../../utils/Block';
import template from './avatar.hbs';
import mockAvatarImg from '../../../static/img/svg/photo.svg';

type AvatarProps = {
    avatarSrc: string | null;
    alt: string;
    class?: string;
    isMockedAvatar?: boolean;
    events: {
        click: () => void;
    }
};

export default class Avatar extends Block<AvatarProps> {
    constructor({ onClick, ...props }: any) {
        super({
            ...props,
            mockAvatarImg,
            events: {
                click: onClick,
            },
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
