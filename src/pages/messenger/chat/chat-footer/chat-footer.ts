import template from './chat-footer.hbs';
import Block from '../../../../utils/Block';
import MessagesController from '../../../../controllers/MessagesController';

import clipIcon from '../../../../../static/img/svg/clip.svg';
import fileIcon from '../../../../../static/img/svg/file.svg';
import targetIcon from '../../../../../static/img/svg/target.svg';
import photoIcon from '../../../../../static/img/svg/photo-color-primary.svg';

type SendFormProps = {
    attachIcon: string;
    attachActions: {
        text: string;
        icon: string;
    }[];
    onActionBtnClick: () => void;
    onSendMessageBtnClick: (e: Event) => void;
};

export default class ChatFooter extends Block<SendFormProps> {
    constructor() {
        const sendFormProps = {
            attachIcon: clipIcon,
            attachActions: [
                {
                    text: 'Фото или Видео',
                    icon: photoIcon,
                },
                {
                    text: 'Файл',
                    icon: fileIcon,
                },
                {
                    text: 'Локация',
                    icon: targetIcon,
                },
            ],
            onActionBtnClick: () => this.refs.actionPopup.toggleVisibility(),
            onSendMessageBtnClick: (e: Event) => this.onSendMessageBtnClick(e),
        };

        super(sendFormProps);
    }

    protected init(): void {
        setTimeout(() => this.refs.message.refs.input.focus(), 0);
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
            refs: this.refs,
        });
    }

    onSendMessageBtnClick(e: Event) {
        e.preventDefault();
        const input = this.refs.message.refs.input;
        const message = input.getValue();

        input.setValue('');

        if (message !== '') {
            MessagesController.sendMessage(message);
        }
    }
}
