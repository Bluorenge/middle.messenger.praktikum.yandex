import EventBus from './EventBus';
import { nanoid } from 'nanoid';

// Нельзя создавать экземпляр данного класса
class Block<P extends TObj = {}> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_CDUNM: 'flow:component-did-unmount',
        FLOW_RENDER: 'flow:render',
    } as const;

    public id = nanoid(6);
    protected props: P;
    public refs: Record<string, Block | any> = {};
    public children: Record<string, Block> = {};
    private eventBus: () => EventBus;
    private _element: HTMLElement | null = null;
    public static componentName?: string;

    constructor(propsWithChildren: P) {
        const { props, children } =
            this._getChildrenAndProps(propsWithChildren);

        this.children = children;
        this.props = this._makePropsProxy(props);

        const eventBus = new EventBus();
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _getChildrenAndProps(childrenAndProps: P): {
        props: P;
        children: Record<string, Block>;
    } {
        const props: Record<string, unknown> = {};
        const children: Record<string, Block> = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key as string] = value;
            } else {
                props[key] = value;
            }
        });

        return { props: props as P, children };
    }

    _addEvents() {
        const { events = {} } = this.props as P & {
            events: Record<string, () => void>;
        };

        Object.keys(events).forEach(eventName => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    _removeEvents() {
        const { events } = this.props as P & {
            events: Record<string, () => void>;
        };

        if (!events || !this._element) {
            return;
        }

        Object.keys(events).forEach(eventName => {
            this._element!.removeEventListener(eventName, events[eventName]);
        });
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDUNM, this._componentDidUnmount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _init() {
        this.init();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected init() {}

    private _componentDidMount() {
        this.componentDidMount();
    }

    protected componentDidMount() {}

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

        // ! ребенка может не быть на момент первого рендера
        Object.values(this.children).forEach(child => {
            child.dispatchComponentDidMount();
        });
    }

    private _componentDidUnmount() {
        this.componentDidUnmount();
    }

    protected componentDidUnmount() {}

    public dispatchComponentDidUnmount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDUNM);

        Object.values(this.children).forEach(child =>
            child.dispatchComponentDidUnmount(),
        );
    }

    private _componentDidUpdate(oldProps: P, newProps: P) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            Object.values(this.children).forEach(child => {
                // чтобы не было лишних подписок
                child.dispatchComponentDidUnmount();
            });
            this.children = {}; // потому что все дети добавляются из шаблона на этапе рендера
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    protected componentDidUpdate(oldProps: P, newProps: P) {
        return oldProps !== newProps;
    }

    public dispatchComponentDidUpdate() {
        this._componentDidMount();
    }

    setProps = (nextProps: P) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    private _render() {
        this._removeEvents();
        const fragment = this.render();
        const newElement = fragment.firstElementChild as HTMLElement;
        this._element?.replaceWith(newElement);
        this._element = newElement;
        this._addEvents();
    }

    protected compile(template: (context: any) => string, context: any) {
        const contextAndStubs = { ...context };
        const html = template(contextAndStubs);
        const temp = document.createElement('template');
        temp.innerHTML = html;

        Object.entries(this.children).forEach(([_, component]) => {
            const stub = temp.content.querySelector(
                `[data-id="${component.id}"]`,
            );

            if (!stub) {
                return;
            }

            component.getContent()?.append(...Array.from(stub.childNodes));

            stub.replaceWith(component.getContent()!);
            // пропсы могли не измениться, а перерендер произошёл из-за родителя
            component.eventBus().emit(Block.EVENTS.FLOW_CDU);
        });

        return temp.content;
    }

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: P) {
        return new Proxy(props, {
            get: (target, prop: string) => {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set: (target, prop: string, value) => {
                const oldTarget = { ...target };
                target[prop as keyof P] = value;

                this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            },
        });
    }

    show() {
        this.getContent()!.classList.remove('hidden');
    }

    hide() {
        this.getContent()!.classList.add('hidden');
    }

    toggleVisibility() {
        this.getContent()!.classList.toggle('hidden');
    }
}

export default Block;
