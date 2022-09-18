import template from './error-page.hbs';
import Block from '../../utils/Block';

export default class ErrorPage extends Block {
    constructor(error: string) {
        const errorPageProps = {
            error: error,
            desc: '',
            prevLink: {
                link: '/messenger.html',
                text: 'Назад к чатам',
            },
        };
        if (errorPageProps.error === '404') {
            errorPageProps.desc = 'Упс. Не туда попали';
        } else {
            errorPageProps.desc = 'Мы уже фиксим';
        }

        super(errorPageProps);
    }

    render() {
        return this.compile(template, this.props);
    }
}
