type Handler<A extends any[] = unknown[]> = (...args: A) => void;
type MapInterface<P> = P[keyof P];

export default class EventBus<
    E extends Record<string, string> = Record<string, string>,
    Args extends Record<MapInterface<E>, any[]> = Record<string, any[]>,
> {
    private readonly listeners: {
        [K in MapInterface<E>]?: Handler<Args[K]>[];
    } = {};

    on<Event extends MapInterface<E>>(
        events: Event | Event[],
        callback: Handler<Args[Event]>,
    ) {
        if (Array.isArray(events)) {
            for (const event of events) {
                this.addEvent(event, callback);
            }
        } else {
            this.addEvent(events, callback);
        }
    }

    private addEvent<Event extends MapInterface<E>>(
        event: Event,
        callback: Handler<Args[Event]>,
    ) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event]?.push(callback);
    }

    off<Event extends MapInterface<E>>(
        events: Event | Event[],
        callback: Handler<Args[Event]>,
    ) {
        if (Array.isArray(events)) {
            for (const event of events) {
                this.removeEvent(event, callback);
            }
        } else {
            this.removeEvent(events, callback);
        }
    }

    private removeEvent<Event extends MapInterface<E>>(
        event: Event,
        callback: Handler<Args[Event]>,
    ) {
        if (!this.listeners[event]) {
            return;
        }

        this.listeners[event] = this.listeners[event]!.filter(listener => {
            return listener !== callback;
        });
    }

    emit<Event extends MapInterface<E>>(event: Event, ...args: Args[Event]) {
        if (!this.listeners[event]) {
            return;
        }

        this.listeners[event]!.forEach(listener => {
            listener(...args);
        });
    }
}
