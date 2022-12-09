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
    constructor(props: any) {
        const messageProps = {
            currentUserId: props.currentUserId,
            senderId: props.senderId,
            content: props.content,
            file: props.file,
            time: dateFormater(props.time),
            isRead: props.isRead,
        };
        super(messageProps);
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
        });
    }
}
