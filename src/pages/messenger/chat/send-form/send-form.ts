import template from './send-form.hbs';
import Block from '../../../../utils/Block';
import getFormData from '../../../../utils/getFormData';

import clipIcon from '../../../../../static/img/svg/clip.svg';
import fileIcon from '../../../../../static/img/svg/file.svg';
import targetIcon from '../../../../../static/img/svg/target.svg';
import photoIcon from '../../../../../static/img/svg/photo-color-primary.svg';

export default class SendForm extends Block {
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
        };
        super(sendFormProps);

        this.setProps({
            events: {
                click: (e: Event) => {
                    const target = e.target as Element;

                    if (target.closest('.open-sm-popup')) {
                        e.preventDefault();
                        this.refs.actionPopup.toggleVisibility();
                    }
                    if (target.tagName === 'BUTTON') {
                        getFormData(this);
                    }
                },
            },
        });
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
            refs: this.refs,
        });
    }
}
