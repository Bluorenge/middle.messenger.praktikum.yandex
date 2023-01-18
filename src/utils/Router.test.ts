import Router from './Router';
import { expect } from 'chai';
import sinon from 'sinon';
import Block from './Block';

describe('Router', () => {
    const originalForward = window.history.forward;
    const originalBack = window.history.back;
    class Page extends Block {}

    beforeEach(() => {
        window.history.forward = sinon.fake();
        window.history.back = sinon.fake();
    });

    after(() => {
        window.history.forward = originalForward;
        window.history.back = originalBack;
    });

    it('go', () => {
        Router.use('/page', Page as typeof Block)
            .go('/page');

        expect(window.history.length).to.eq(2);
    });

    it('forward', () => {
        Router.forward();

        expect((window.history.forward as any).callCount).to.eq(1);
    });

    it('back', () => {
        Router.back();

        expect((window.history.back as any).callCount).to.eq(1);
    });
});
