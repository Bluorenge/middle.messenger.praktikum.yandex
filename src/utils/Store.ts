import { EventBus } from './EventBus';
import { isEqual, set } from './common';
import Block from './Block';
import { StoreEvents, StoreData } from './../_models/store';

export class Store extends EventBus {
    private state: any = {};

    public set(keypath: string, data: unknown, emitName?: string) {
        const newState = set(this.state, keypath, data);
        if (newState) {
            this.state = newState;
        }

        this.emit(emitName ?? StoreEvents.Updated);
    }

    public getState() {
        return this.state;
    }
}

const store = new Store();

export function withStore(
    mapStateToProps: (state: StoreData) => TObj,
    nameStoreEvent: string | string[] = StoreEvents.Updated,
    isForceSetProps = false,
) {
    return function (Component: typeof Block) {
        let state: any;

        return class extends Component {
            public static componentName = Component.name || Component.componentName;

            constructor(props: any) {
                state = mapStateToProps(store.getState());

                super({ ...props, ...state });

                store.on(nameStoreEvent, this.storeEventHandler);
            }

            private storeEventHandler = () => {
                const newState = mapStateToProps(store.getState());

                if (!isEqual(state, newState) || isForceSetProps) {
                    state = newState;
                    this.setProps({
                        ...newState,
                    });
                }
            };

            protected componentDidUnmount(): void {
                store.off(nameStoreEvent, this.storeEventHandler);
            }
        };
    };
}

export default store;
