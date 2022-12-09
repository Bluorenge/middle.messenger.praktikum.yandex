import EventBus from './EventBus';
import { isEqual, set } from './common';
import Block from './Block';
import { User } from './../api/AuthApi';
import { Message } from '../controllers/MessagesController';

export enum StoreEvents {
    Updated = 'updated',
    MessagesUpdated = 'messages-updated',
    SelectedChatUpdated = 'selectedChat-updated',
}

export interface ChatOfList {
    id: number;
    title: string;
    avatar: string | null;
    unread_count: number | null;
    last_message: {
        user: {
            first_name: string;
            second_name: string;
            avatar: string | null;
            email: string;
            login: string;
            phone: string;
        },
        time: string;
        content: string;
    } | null;
}

export interface StoreData {
    currentUser: User;
    registerProps: TObj;
    loginProps: TObj;
    selectedChat: number;
    chatList: ChatOfList[];
    messages: Message[];
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
