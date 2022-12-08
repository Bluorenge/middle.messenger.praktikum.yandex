import template from './message.hbs';
import Block from '../../../../utils/Block';
import dateFormater from '../../../../utils/dateFormatter';

type MessageProps = {
    currentUserId: number;
    senderId: number;
    text: string;
    img: string;
    date: string | null;
    time: string;
    isViewed: boolean;
};

export default class Message extends Block<MessageProps> {
    constructor(props: any) {
        const messageProps = {
            currentUserId: props.currentUserId,
            senderId: props.senderId,
            text: props.content,
            img: props.img,
            date: dateFormater(props.date),
            time: props.time,
            isViewed: props.isViewed,
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
