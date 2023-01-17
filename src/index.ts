import './styles/main.scss';

import Router from './utils/Router';
import Block from './utils/Block';
import { Pages } from './_models/pages';

import Login from './pages/login/login';
import Register from './pages/register/register';
import Messenger from './pages/messenger/messenger';
import Account from './pages/account/account';
import ErrorPage from './pages/error-page/error-page';
import AuthController from './controllers/AuthController';

import { registerComponent } from './utils/hbsHelpers';
const context = require.context('./components/', true, /^.*\/(?!.*test).*\.ts$/);
const components = context.keys().map(key => context(key));
components.forEach((item: any) => registerComponent(item.default));

window.addEventListener('DOMContentLoaded', async () => {
    Router
        .use('/', Login as typeof Block)
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
