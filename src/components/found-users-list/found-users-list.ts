import template from './found-users-list.hbs';
import Block from '../../utils/Block';
import store, { StoreData, StoreEvents } from '../../utils/Store';
import { isEqual } from '../../utils/common';
import ChatController from './../../controllers/ChatController';
import { User } from './../../_models/user';

type FoundUsersListProps = {
    initState: boolean;
    events: {
        click: (e: Event) => void;
    }
    foundUsers: User[];
};

export default class FoundUsersList extends Block<FoundUsersListProps> {
    static ITEM_ACTIVE_CLASS = 'found-users-list__item--active';

    constructor() {
        const mapStateToProps = (state: StoreData) => ({
            foundUsers: state.foundUsers || [],
        });
        let state = mapStateToProps(store.getState());

        super({
            initState: true,
            events: {
                click: (e: Event) => {
                    const listItem = (e.target as HTMLElement).closest('.found-users-list__item');

                    if (listItem) {
                        listItem.classList.toggle(FoundUsersList.ITEM_ACTIVE_CLASS);
                        const name = listItem.querySelector('.found-users-list__name')!.textContent?.trim();

                        ChatController.selectUserForCreateChat(name!);
                    }
                },
            },
            ...state,
        });

        // Подписываемся здесь, потому что компонент регается без HOC
        store.on(StoreEvents.FoundUsersUpdated, () => {
            const newState = mapStateToProps(store.getState());

            if (!isEqual(state, newState)) {
                state = newState;
                this.props.initState = false;
                this.setProps({
                    ...this.props,
                    ...newState,
                });
            }
        });
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
        });
    }
}
