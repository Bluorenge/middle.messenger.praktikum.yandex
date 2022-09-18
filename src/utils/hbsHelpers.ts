import Handlebars from 'handlebars/dist/handlebars.runtime';
import { HelperOptions } from 'handlebars';
import Block from './Block';

Handlebars.registerHelper(
    'ifEquals',
    function (this: any, arg1: number | string, arg2: number | string, options: any) {
        return arg1 === arg2 ? options.fn(this) : options.inverse(this);
    },
);

export function registerComponent(Component: typeof Block) {
    Handlebars.registerHelper(
        Component.name,
        function (this: any, { hash, data, fn }: HelperOptions) {
            const component = new Component(hash);

            const { children } = data.root;
            children[component.id] = component;

            if (hash.ref) {
                data.root.refs[hash.ref] = component;
            }

            const contents = fn ? fn(this) : '';

            return `<div data-id="${component.id}">${contents}</div>`;
        },
    );
}
