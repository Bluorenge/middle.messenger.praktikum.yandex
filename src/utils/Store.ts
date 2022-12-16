import EventBus from './EventBus';
import { isEqual, set } from './common';
import Block from './Block';
import { User } from './../_models/user';
import { ChatData, Message } from './../_models/chat';

export enum StoreEvents {
    Updated = 'updated',
    MessagesUpdated = 'messages-updated',
    SelectedChatUpdated = 'selectedChat-updated',
    FoundUsersUpdated = 'foundUsers-updated',
}

export interface StoreData {
    currentUser: User;
    registerProps: TObj;
    loginProps: TObj;
    selectedChat: number;
    chatList: ChatData[];
    messages: Message[];
    foundUsers: User[];
    selectUserForCreateChat: string;
}

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

export const withStore = (mapStateToProps: (state: StoreData) => TObj) => (Component: typeof Block) => {
    let state: any;

    return class extends Component {
        constructor(props: any) {
            state = mapStateToProps(store.getState());

            super({ ...props, ...state });

            store.on(StoreEvents.Updated, () => {
                const newState = mapStateToProps(store.getState());

                if (!isEqual(state, newState)) {
                    state = newState;
                    this.setProps({
                        ...newState,
                    });
                }
            });
        }
    };
};

export default store;
