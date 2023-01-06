import { expect } from 'chai';
import { Link } from './link';
import sinon from 'sinon';

describe('Link', () => {
    let routerMock: any;

    beforeEach(() => {
        routerMock = {
            go: sinon.fake(),
        };
    });

    it('should call Router.go on click', () => {
        const instance = new Link({
            router: routerMock,
            to: '/page',
        });
        const element = instance.element;
        element?.click();

        expect(routerMock.go.callCount).to.eq(1);
    });

    it('should call Router.go on click with href', () => {
        const path = '/page';
        const instance = new Link({
            router: routerMock,
            to: path,
        });
        const element = instance.element;
        element?.click();

        expect(routerMock.go.firstArg).to.eq(path);
    });
});
