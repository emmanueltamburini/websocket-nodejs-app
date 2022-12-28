import { LAST_TICKET_SOCKET_PATH, NEXT_TICKET_SOCKET_PATH } from "../constants/routes.constant.js";
import TicketControl from "../models/ticketControl.js";

const ticketControl = new TicketControl();

export const socketController = socket => {
    socket.emit(LAST_TICKET_SOCKET_PATH, `Ticket ${ticketControl.lastTicket}`);

    socket.on(NEXT_TICKET_SOCKET_PATH, (payload, callback) => {
        const next = ticketControl.next();
        if(callback) callback(next);

        //NOTICE NEW TICKET
        socket.broadcast.emit(LAST_TICKET_SOCKET_PATH, `Ticket ${ticketControl.lastTicket}`);
    })
}
