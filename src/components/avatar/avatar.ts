import Block from '../../utils/Block';
import template from './avatar.hbs';
import mockAvatarImg from '../../../static/img/svg/photo.svg';

type AvatarProps = {
    avatar: string | null;
    alt: string;
    class?: string;
    isMockedAvatar?: boolean;
};

export default class Avatar extends Block<AvatarProps> {
    constructor(props: any) {
        console.log("props: ", props);
        super({ ...props, mockAvatarImg });
    }

    render() {
        return this.compile(template, this.props);
    }
}
