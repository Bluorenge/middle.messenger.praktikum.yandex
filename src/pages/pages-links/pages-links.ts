import Block from '../../utils/Block';
import template from './pages-links.hbs';

type LinkProps = {
    pagesLinks: {
        name: string;
        link: string;
    }[];
};

export default class PagesLinks extends Block<LinkProps> {
    constructor() {
        const pagesLinksProps: LinkProps = {
            pagesLinks: [
                {
                    name: 'логин',
                    link: '/login',
                },
                {
                    name: 'регистрация',
                    link: '/register',
                },
                {
                    name: 'мессенджер',
                    link: '/messenger',
                },
                {
                    name: 'профиль',
                    link: '/account',
                },
                {
                    name: '404',
                    link: '/not-found',
                },
                {
                    name: '505',
                    link: '/server-error',
                },
            ],
        };
        super(pagesLinksProps);
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
            refs: this.refs,
        });
    }
}
