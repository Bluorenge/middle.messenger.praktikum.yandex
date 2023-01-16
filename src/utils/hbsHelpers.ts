const Handlebars = require('handlebars/runtime');
import { HelperOptions } from 'handlebars';
import Block from './Block';
import mockAvatarImg from '../../static/img/svg/photo.svg';

const RESOURCES_PATH = 'https://ya-praktikum.tech/api/v2/resources';

Handlebars.registerHelper('resourcesPath', function () {
    return RESOURCES_PATH;
});

Handlebars.registerHelper('mockAvatarImg', function () {
    return mockAvatarImg;
});

Handlebars.registerHelper(
    'ifEquals',
    function (this: any, arg1: number | string, arg2: number | string, options: any) {
        return arg1 === arg2 ? options.fn(this) : options.inverse(this);
    },
);

export function registerComponent(Component: typeof Block) {
    if (!Component || !Component.componentName) {
        return;
    }
    Handlebars.registerHelper(
        Component.componentName || Component.name,
        function (this: any, { hash, data, fn }: HelperOptions) {
            if (!data.root.children) {
                data.root.children = {};
            }

            if (!data.root.refs) {
                data.root.refs = {};
            }

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
