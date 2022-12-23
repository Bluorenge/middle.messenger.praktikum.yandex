import WSTransport, { WSTransportEvents } from '../utils/WSTransport';
import ChatController from './ChatController';
import store from '../utils/Store';

import { Message } from './../_models/chat';
import { StoreEvents } from './../_models/store';
import dateFormater from '../utils/dateFormatter';

class MessagesController {
    private sockets: Map<number, WSTransport> = new Map();

    async connect(id: number, token: string) {
        if (this.sockets.has(id)) {
            return;
        }

        const userId = store.getState().currentUser.id;
        const wsTransport = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`);

        this.sockets.set(id, wsTransport);
        await wsTransport.connect();

        this.subscribe(wsTransport, id);
        this.fetchOldMessage(id);
    }

    public fetchOldMessage(id: number) {
        this.sendSocketMessage(id);
    }

    public sendMessage(message: string) {
        const chatId = store.getState().selectedChat.id;
        this.sendSocketMessage(chatId, message);
    }

    public closeAll() {
        Array.from(this.sockets.values()).forEach(socket => socket.close());
    }

    private sendSocketMessage(id: number, message?: string) {
        const socket = this.sockets.get(id);

        if (!socket) {
            throw new Error(`Chat ${id} is not connected`);
        }

        // TODO: Обработать разные типы сообщений
        socket.send({
            type: message ? 'message' : 'get old',
            content: message ?? '0',
        });
    }

    private subscribe(transport: WSTransport, id: number) {
        transport.on(WSTransportEvents.Message, (message) => this.onMessage(id, message));
        transport.on(WSTransportEvents.Close, () => this.onClose(id));
    }

    private onMessage(id: number, messages: Message | Message[]) {
        if (!Array.isArray(messages) && !messages.user_id) {
            return;
        }
        let messagesToAdd: Message[] = [];

        if (Array.isArray(messages)) {
            messagesToAdd = messages.reverse();
        } else {
            messagesToAdd.push(messages);
        }

        const currentMessages = (store.getState().messages || [])[id] || [];

        messagesToAdd = [...currentMessages, ...messagesToAdd];
        this.setDateToMessages(messagesToAdd);
        store.set(`messages.${id}`, messagesToAdd, StoreEvents.MessagesUpdated);
        ChatController.fetchChats(); // чтобы обновилось время в списке чатов
    }

    private setDateToMessages(messages: Message[]) {
        // Добавляем полям дату, чтобы разделить сообщения на блоки
        for (const message of messages as any) {
            message.date = null;
            const dateMessage = dateFormater(message.time);
            const isDateBlockExist = (messages as any).find((i: any) => i.date === dateMessage);

            if (!isDateBlockExist) {
                message.date = dateMessage;
            }
        }
    }

    private onClose(id: number) {
        this.sockets.delete(id);
    }
}

export default new MessagesController();
