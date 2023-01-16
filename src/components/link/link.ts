import Block from '../../utils/Block';
import { WithRouterProps, withRouter } from '../../utils/Router';
import template from './link.hbs';

interface LinkProps extends WithRouterProps {
    to: string;
    class?: string;
    onClick?: () => void;
}

export class Link extends Block {
    public static componentName = 'Link';

    constructor({ router, onClick, ...props }: LinkProps) {
        super({
            ...props,
            events: {
                click: (e: MouseEvent) => {
                    e.preventDefault();

                    if (onClick) {
                        onClick();
                    }

                    router.go(props.to);
                },
            },
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default withRouter(Link as typeof Block);
