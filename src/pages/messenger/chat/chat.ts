import template from './chat.hbs';
import Block from '../../../utils/Block';
import messengerChat1 from '../../../../static/img/messenger/img-1.png';

import { registerComponent } from '../../../utils/hbsHelpers';
import components from './*/*.ts';

Object.entries(components).forEach(([key, value]: any) =>
    registerComponent(value[key].default),
);

export default class Chat extends Block {
    constructor(selectedChat: TObj) {
        const chatProps = {
            ...selectedChat,
            messages: [
                {
                    text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.<br><br>Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них',
                    img: '',
                    date: '19 июля',
                    time: '11:56',
                    senderId: 3,
                },
                {
                    text: '',
                    img: messengerChat1,
                    date: '',
                    time: '11:56',
                    senderId: 3,
                },
                {
                    text: 'Круто!',
                    img: '',
                    date: '',
                    time: '12:00',
                    senderId: 1,
                    isViewed: true,
                },
                {
                    text: 'Хочу себе такую',
                    img: '',
                    date: '',
                    time: '12:01',
                    senderId: 1,
                    isViewed: false,
                },
            ],
        };
        super(chatProps);
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
        });
    }
}
