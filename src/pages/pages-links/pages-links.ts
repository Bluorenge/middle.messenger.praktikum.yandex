import Block from '../../utils/Block';
import template from './pages-links.hbs';

interface LinkObject {
    name: string;
    link: string;
}

export default class PagesLinks extends Block {
    constructor() {
        const pagesLinksProps: { pagesLinks: LinkObject[] } = {
            pagesLinks: [
                {
                    name: 'логин',
                    link: 'login.html',
                },
                {
                    name: 'регистрация',
                    link: 'register.html',
                },
                {
                    name: 'мессенджер',
                    link: 'messenger.html',
                },
                {
                    name: 'профиль',
                    link: 'account.html',
                },
                {
                    name: '404',
                    link: 'not-found.html',
                },
                {
                    name: '505',
                    link: 'server-error.html',
                },
            ],
        };
        super(pagesLinksProps);
    }

    render() {
        return this.compile(template, this.props);
    }
}
