import template from './message.hbs';
import Block from '../../../../utils/Block';
import dateFormater from '../../../../utils/dateFormatter';

type MessageProps = {
    currentUserId: number;
    senderId: number;
    content: string;
    file: TObj | null;
    time: string | null;
    isRead: boolean;
};

export default class Message extends Block<MessageProps> {
    constructor({ time, ...props }: any) {
        super({
            time: dateFormater(time, true),
            ...props,
        });
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
        });
    }
}
