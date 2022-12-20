import template from './found-users-list.hbs';
import Block from '../../utils/Block';
import ChatController from './../../controllers/ChatController';
import { User } from './../../_models/user';
import { withStore } from '../../utils/Store';
import { StoreEvents } from './../../_models/store';

type FoundUsersListProps = {
    initState: boolean;
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
        });
    }

    protected componentDidUpdate() {
        this.props.initState = false;
        return true;
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
        });
    }
}

const withFoundUsers = withStore((state) => ({ foundUsers: state.foundUsers || [] }), StoreEvents.FoundUsersUpdated);

export default withFoundUsers(FoundUsersList as typeof Block);
