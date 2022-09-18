import template from './messenger.hbs';
import Block from '../../utils/Block';
import lens from '../../../static/img/svg/lens.svg';

import { registerComponent } from '../../utils/hbsHelpers';
import components from './*/*.ts';

Object.entries(components).forEach(([key, value]: any) =>
    registerComponent(value[key].default),
);

export default class Messenger extends Block {
    constructor() {
        const messengerProps = {
            accountImg: '',
            searchFieldIcon: lens,
            chatList: [
                {
                    img: '',
                    chatName: 'Андрей',
                    text: 'Изображение',
                    datetime: '10:49',
                    count: '2',
                    senderId: 2,
                },
                {
                    img: '',
                    chatName: 'Киноклуб',
                    text: 'стикер',
                    datetime: '10:49',
                    count: '',
                    senderId: 1,
                },
                {
                    img: '',
                    chatName: 'Вадим',
                    text: 'Хочу себе такую',
                    datetime: '12:01',
                    count: '',
                    senderId: 1,
                },
            ],
            selectedСhat: {
                name: 'Вадим',
                img: '',
            },
        };
        super(messengerProps);
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
        });
    }
}
