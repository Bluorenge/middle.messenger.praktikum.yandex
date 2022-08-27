import './styles/main.scss';
import './utils/hbsHelpers';
import './components/index';

import pagesLinks from './pages/pages-links/pages-links';
import login from './pages/login/login';
import register from './pages/register/register';
import messenger from './pages/messenger/messenger';
import account from './pages/account/account';
import errorPage from './pages/error-page/error-page';

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

function onTitledInputsListener() {
    const FILLED_CLASS = 'field__input--filled';
    const inputsEl = document.querySelectorAll('.field__input');

    inputsEl.forEach((inputEl) => {
        inputEl.addEventListener('input', () => {
            if (inputEl.value !== '') {
                inputEl.classList.add(FILLED_CLASS);
            } else if (inputEl.value === '') {
                inputEl.classList.remove(FILLED_CLASS);
            }
        });
    });
}

function onFileInputsListener() {
    const fieldsEl = document.querySelectorAll('.field--file');

    fieldsEl.forEach((fieldEl) => {
        const inputEl = fieldEl.querySelector('.field__input');
        const fieldTitle = fieldEl.querySelector('.field__title');
        const initText = fieldTitle.textContent;

        inputEl.addEventListener('change', () => {
            if (inputEl.files.length > 0) {
                fieldTitle.textContent = inputEl.files[0].name;
            } else if (inputEl.files.length === 0) {
                fieldTitle.textContent = initText;
            }
        });
    });
}

function onPopupOpenListener() {
    const openPopup = document.querySelector('.open-popup');
    const popup = document.querySelector('.popup');
    const closePopup = document.querySelector('.popup__close');
    const overlayPopup = document.querySelector('.popup__overlay');
    const togglePopupVisibility = () => popup.classList.toggle('hidden');

    openPopup.addEventListener('click', togglePopupVisibility);
    closePopup.addEventListener('click', togglePopupVisibility);
    overlayPopup.addEventListener('click', togglePopupVisibility);
}

function onSmPopupOpenListener() {
    const openSmPopup = document.querySelectorAll('.open-sm-popup');

    openSmPopup.forEach((btn) => {
        btn.addEventListener('click', () =>
            btn.nextElementSibling.classList.toggle('hidden')
        );
    });
}
