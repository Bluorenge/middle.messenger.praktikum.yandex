import proxyquire from 'proxyquire';
import { expect } from 'chai';
import sinon from 'sinon';
import type BlockType from './Block';

const eventBusMock = {
    on: sinon.fake(),
    emit: sinon.fake(),
};

const { default: Block } = proxyquire('./Block', {
    './EventBus': {
        EventBus: class {
            emit = eventBusMock.emit;
            on = eventBusMock.on;
        },
    },
}) as { default: typeof BlockType };

describe('Block', () => {
    class ComponentMock extends Block {}

    it('should fire init event on initialization',  () => {
        new ComponentMock({});

        expect(eventBusMock.emit.calledWith('init')).to.eq(true);
    });

    it('should fire flow:component-did-mount event on mount', () => {
        new ComponentMock({}).dispatchComponentDidMount();

        expect(eventBusMock.emit.calledWith('flow:component-did-mount')).to.eq(true);
    });

    it('set props', () => {
        const instanse = new ComponentMock({});
        instanse.setProps({
            value: 'New value',
        });
        // @ts-ignore
        expect(instanse.props.value).to.eq('New value');
    });
});
