import template from './messenger.hbs';
import './chat-list-item/chat-list-item';
import './chat/chat';
import lens from '../../../static/img/svg/lens.svg';
import clip from '../../../static/img/svg/clip.svg';
import file from '../../../static/img/svg/file.svg';
import target from '../../../static/img/svg/target.svg';
import photo from '../../../static/img/svg/photo-color-primary.svg';
import messengerChat1 from '../../../static/img/messenger/img-1.png';

const context = {
    account: {
        link: 'account.html',
        text: 'Профиль',
        img: '',
    },
    search: {
        label: 'Поиск',
        name: 'search',
        type: 'text',
        class: 'field--search',
        icon: lens,
    },
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
    messengerChat: {
        img: '',
        name: 'Вадим',
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
        adminActions: {
            position: 'down',
            actions: [
                {
                    text: 'Добавить пользователя',
                    class: 'add-icon',
                },
                {
                    text: 'Удалить пользователя',
                    class: 'remove-icon',
                },
            ],
        },
        sendForm: {
            attacheActions: {
                icon: clip,
                position: 'up',
                actions: [
                    {
                        text: 'Фото или Видео',
                        icon: photo,
                    },
                    {
                        text: 'Файл',
                        icon: file,
                    },
                    {
                        text: 'Локация',
                        icon: target,
                    },
                ],
            },
            field: {
                label: 'Сообщение',
                name: 'message',
                type: 'text',
                class: 'field--message',
            },
            btn: {
                class: 'btn--arrow-right',
            },
        },
    },
    accountLink: {
        text: 'Профиль',
        link: '/account.html',
    },
};

export default template(context);
