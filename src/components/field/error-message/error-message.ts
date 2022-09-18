import Block from '../../../utils/Block';
import template from './error-message.hbs';

export default class ErrorMessage extends Block {
    render() {
        return this.compile(template, this.props);
    }
}
