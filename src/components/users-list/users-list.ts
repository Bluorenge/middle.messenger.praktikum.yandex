import template from './users-list.hbs';
import Block from '../../utils/Block';
import ChatController from '../../controllers/ChatController';

type UsersListProps = {
    initState: boolean;
    events: {
        click: (e: Event) => void;
    }
};

export default class UsersList extends Block<UsersListProps> {
    public static componentName = 'UsersList';
    static ITEM_ACTIVE_CLASS = 'users-list__item--active';

    constructor() {
        super({
            initState: true,
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
        const listItem = (e.target as HTMLElement).closest('.users-list__item');

        if (listItem) {
            const foundUsersItems = this.element!.querySelectorAll('.users-list__item');
            for (const item of foundUsersItems) {
                item.classList.remove(UsersList.ITEM_ACTIVE_CLASS);
            }
            listItem.classList.add(UsersList.ITEM_ACTIVE_CLASS);

            const name = listItem.querySelector('.users-list__name')!.textContent?.trim();

            ChatController.setSelectedUsers(name!);
        }
    }
}
