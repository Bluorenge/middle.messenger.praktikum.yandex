import template from './send-form.hbs';
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
    events: {
        click: (e: Event) => void;
    }
};

export default class SendForm extends Block<SendFormProps> {
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
            events: {
                click: (e: Event) => this.onClick(e),
            },
        };

        super(sendFormProps);
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
            refs: this.refs,
        });
    }

    onClick(e: Event) {
        const target = e.target as Element;

        if (target.closest('.open-sm-popup')) {
            e.preventDefault();
            this.refs.actionPopup.toggleVisibility();
        }
        if (target.tagName === 'BUTTON') {
            const input = this.refs.message.refs.input;
            const message = input.getValue();

            input.setValue('');

            if (message !== '') {
                MessagesController.sendMessage(message);
            }
        }
    }
}
