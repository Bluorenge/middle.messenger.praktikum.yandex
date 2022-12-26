import template from './found-users-list.hbs';
import Block from '../../utils/Block';
import ChatController from './../../controllers/ChatController';

type FoundUsersListProps = {
    initState: boolean;
    events: {
        click: (e: Event) => void;
    }
};

export default class FoundUsersList extends Block<FoundUsersListProps> {
    public static componentName = 'FoundUsersList';
    static ITEM_ACTIVE_CLASS = 'found-users-list__item--active';

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
        const listItem = (e.target as HTMLElement).closest('.found-users-list__item');

        if (listItem) {
            listItem.classList.toggle(FoundUsersList.ITEM_ACTIVE_CLASS);
            const name = listItem.querySelector('.found-users-list__name')!.textContent?.trim();

            ChatController.setSelectedUsers(name!);
        }
    }
}
