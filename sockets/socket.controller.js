import { SEND_MESSAGE_SOCKET_PATH } from "../constants/routes.constant.js";
import TicketControl from "../models/ticketControl.js";

const ticketControl = new TicketControl();

export const socketController = socket => {
    socket.on(SEND_MESSAGE_SOCKET_PATH, (payload, callback) => {
        const id = 123456;
        if (callback) callback({id, date: new Date()});

        socket.broadcast.emit(SEND_MESSAGE_SOCKET_PATH, payload);
    })
}
