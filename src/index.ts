import AuthController from './controllers/AuthController';
import './styles/main.scss';
import { registerComponent } from './utils/hbsHelpers';
// @ts-ignore
import commonComponents from './components/**/*.ts';

import Router from './utils/Router';
import Block from './utils/Block';
import { Pages } from './_models/pages';

import PagesLinks from './pages/pages-links/pages-links';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Messenger from './pages/messenger/messenger';
import Account from './pages/account/account';
import ErrorPage from './pages/error-page/error-page';

window.addEventListener('DOMContentLoaded', async () => {
    Object.entries(commonComponents).forEach(([key, value]: any) =>
        registerComponent(value[key].default),
    );

    Router
        .use('/', PagesLinks as typeof Block)
        .use(Pages.Index, PagesLinks as typeof Block)
        .use(Pages.Login, Login as typeof Block)
        .use(Pages.Register, Register as typeof Block)
        .use(Pages.Messenger, Messenger as typeof Block)
        .use(Pages.Account, Account as typeof Block)
        .use(Pages.AccountInfoEdit, Account as typeof Block)
        .use(Pages.AccountPasswordEdit, Account as typeof Block)
        .use(Pages.ServerError, ErrorPage as typeof Block, '500')
        .use(Pages.NotFound, ErrorPage as typeof Block, '404');

    try {
        await AuthController.fetchUser();

        Router.go('/messenger');
    } catch (e) {
        console.log('user don\'t exist', e);
        Router.go('/login');
    }

    Router.start();
});
