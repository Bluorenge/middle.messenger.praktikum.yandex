import AuthController from './controllers/AuthController';
import './styles/main.scss';
import { registerComponent } from './utils/hbsHelpers';
// @ts-ignore
import commonComponents from './components/**/*.ts';

import Router from './utils/Router';
import Block from './utils/Block';

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
        .use('/index', PagesLinks as typeof Block)
        .use('/login', Login as typeof Block)
        .use('/register', Register as typeof Block)
        .use('/messenger', Messenger as typeof Block)
        .use('/account', Account as typeof Block)
        .use('/account-info-edit', Account as typeof Block)
        .use('/account-password-edit', Account as typeof Block)
        .use('/server-error', ErrorPage as typeof Block, '500')
        .use('/not-found', ErrorPage as typeof Block, '404');

    try {
        await AuthController.fetchUser();

        // Router.go('/messenger');
    } catch (e) {
        console.log('user don\'t exist', e);
        // Router.go('/login');
    }

    Router.start();
});
