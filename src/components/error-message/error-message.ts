import Block from '../../utils/Block';
import template from './error-message.hbs';

export type ErrorMessageProps = {
    isShow: boolean;
    text: string;
    class?:string;
};

export default class ErrorMessage extends Block<ErrorMessageProps> {
    render() {
        return this.compile(template, this.props);
    }
}
