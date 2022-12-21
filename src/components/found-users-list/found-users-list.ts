import template from './found-users-list.hbs';
import Block from '../../utils/Block';
import ChatController from './../../controllers/ChatController';

import { User } from './../../_models/user';
import { StoreEvents } from './../../_models/store';
import { withStore } from '../../utils/Store';

type FoundUsersListProps = {
    events: {
        click: (e: Event) => void;
    }
    foundUsers?: User[];
};

class FoundUsersList extends Block<FoundUsersListProps> {
    public static componentName = 'FoundUsersList';
    static ITEM_ACTIVE_CLASS = 'found-users-list__item--active';

    constructor() {
        super({
            events: {
                click: (e: Event) => this.onClick(e),
            },
        });
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
        });
    }

    onClick(e: Event) {
        const listItem = (e.target as HTMLElement).closest('.found-users-list__item');

        if (listItem) {
            listItem.classList.toggle(FoundUsersList.ITEM_ACTIVE_CLASS);
            const name = listItem.querySelector('.found-users-list__name')!.textContent?.trim();

            ChatController.setSelectedUsers(name!);
        }
    }
}

const withFoundUsers = withStore((state) => ({
    foundUsers: state.foundUsers || [],
}), StoreEvents.FoundUsersUpdated);

export default withFoundUsers(FoundUsersList as typeof Block);
