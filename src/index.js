import './styles/main.scss';
import './utils/hbsHelpers';
import './components/index';

import pagesLinks from './pages/pages-links/pages-links';
import login from './pages/login/login';
import register from './pages/register/register';
import messenger from './pages/messenger/messenger';
import account from './pages/account/account';
import errorPage from './pages/error-page/error-page';

import {
    onTitledInputsListener,
    onFileInputsListener,
    onPopupOpenListener,
    onSmPopupOpenListener,
} from './utils/listeners';

let pageName = document.location.pathname.slice(1).replace('.html', '');
document.title = pageName;
let rootEl = document.getElementById('root');

switch (pageName) {
    case 'index':
    case '':
        rootEl.innerHTML = pagesLinks;
        break;
    case 'login':
        rootEl.innerHTML = login;
        onTitledInputsListener();
        break;
    case 'register':
        rootEl.innerHTML = register;
        onTitledInputsListener();
        break;
    case 'messenger':
        rootEl.innerHTML = messenger;
        onSmPopupOpenListener();
        break;
    case 'account':
    case 'account-info-edit':
    case 'account-password-edit':
        rootEl.innerHTML = account(pageName);
        onPopupOpenListener();
        onFileInputsListener();
        break;
    case 'server-error':
        rootEl.innerHTML = errorPage('500');
        break;
    default:
        rootEl.innerHTML = errorPage('404');
}
