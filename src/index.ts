import './styles/main.scss';
import { registerComponent } from './utils/hbsHelpers';
import commonComponents from './components/**/*.ts';

import PagesLinks from './pages/pages-links/pages-links';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Messenger from './pages/messenger/messenger';
import Account from './pages/account/account';
import ErrorPage from './pages/error-page/error-page';
import Popup from './components/popup/popup';

import Block from './utils/Block';

window.addEventListener('DOMContentLoaded', () => {
    Object.entries(commonComponents).forEach(([key, value]: any) =>
        registerComponent(value[key].default),
    );

    const pageName: string = document.location.pathname
        .slice(1)
        .replace('.html', '');
    document.title = pageName;

    const rootEl: HTMLElement | null = document.getElementById('root');

    const accountImgPopupProps = {
        title: 'Загрузите файл',
        btnText: 'Поменять',
        field: {
            label: 'Выбрать файл на компьютере',
            name: 'avatar',
            type: 'file',
            value: '',
            class: 'field--file',
        },
    };

    if (rootEl) {
        switch (pageName) {
            case 'index':
            case '':
                renderDOM(new PagesLinks());
                break;
            case 'login':
                renderDOM(new Login());
                break;
            case 'register':
                renderDOM(new Register());
                break;
            case 'messenger':
                renderDOM(new Messenger());
                break;
            case 'account':
            case 'account-info-edit':
            case 'account-password-edit':
                renderDOM(new Account(pageName));
                renderDOM(new Popup(accountImgPopupProps));
                break;
            case 'server-error':
                renderDOM(new ErrorPage('500'));
                break;
            default:
                renderDOM(new ErrorPage('404'));
        }
    }
});

function renderDOM(block: Block) {
    const root = document.querySelector('#root');
    if (root) {
        root.appendChild(block.getContent()!);
    }
}
