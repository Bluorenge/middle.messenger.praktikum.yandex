import Block from './Block';

function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}

function render(query: string, block: Block) {
    const root = document.querySelector(query);

    if (root === null) {
        throw new Error(`root not found by selector "${query}"`);
    }

    root.innerHTML = '';
    root.append(block.getContent()!);
    block.dispatchComponentDidMount();

    return root;
}

class Route {
    private block: Block | null = null;

    constructor(
        private pathname: string,
        private readonly blockClass: typeof Block,
        private readonly query: string,
        private readonly type: string,
    ) {}

    leave() {
        this.block?.dispatchComponentDidUnmount();
        this.block = null;
    }

    match(pathname: string) {
        return isEqual(pathname, this.pathname);
    }

    render() {
        if (!this.block) {
            this.block = new this.blockClass(this.type ? this.type : {});

            document.title = this.pathname.slice(1);
            render(this.query, this.block);
            return;
        }
    }
}

class Router {
    private routes: Route[] = [];
    private currentRoute: Route | null = null;
    private history = window.history;
    private notFoundRedirect = '/not-found';

    constructor(private readonly rootQuery: string) {}

    public setNotFoundRedirect(pathname: string) {
        this.notFoundRedirect = pathname;
    }

    public use(pathname: string, block: typeof Block, viewType = '') {
        const route = new Route(pathname, block, this.rootQuery, viewType);
        this.routes.push(route);

        return this;
    }

    public start() {
        window.onpopstate = (event: PopStateEvent) => {
            const target = event.currentTarget as Window;

            this._onRoute(target.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            this._onRoute(this.notFoundRedirect);
            return;
        }

        if (this.currentRoute && this.currentRoute !== route) {
            this.currentRoute.leave();
        }

        this.currentRoute = route;
        route.render();
    }

    public go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    public back() {
        this.history.back();
    }

    public forward() {
        this.history.forward();
    }

    private getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}

const router = new Router('#root');

export interface WithRouterProps {
    router: Router
}

export function withRouter(Component: typeof Block) {
    return class extends Component {
        public static componentName = Component.name;

        constructor(props: any) {
            super({ ...props, router: router });
        }
    };
}

export default router;
