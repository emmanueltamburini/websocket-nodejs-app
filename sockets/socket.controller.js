import { LAST_TICKETS_SOCKET_PATH, LAST_TICKET_SOCKET_PATH, NEXT_TICKET_SOCKET_PATH, PENDENT_TICKET_SOCKET_PATH, SERVING_TICKET_SOCKET_PATH } from "../constants/routes.constant.js";
import TicketControl from "../models/ticketControl.js";

const ticketControl = new TicketControl();

export const socketController = socket => {
    socket.emit(LAST_TICKET_SOCKET_PATH, `Ticket ${ticketControl.lastTicket}`);

    socket.emit(LAST_TICKETS_SOCKET_PATH, ticketControl.lastFourTicket);

    socket.emit(PENDENT_TICKET_SOCKET_PATH, ticketControl.tickets.length);

    socket.on(NEXT_TICKET_SOCKET_PATH, (payload, callback) => {
        const next = ticketControl.next();
        if(callback) callback(next);

        socket.emit(PENDENT_TICKET_SOCKET_PATH, ticketControl.tickets.length);
        socket.broadcast.emit(PENDENT_TICKET_SOCKET_PATH, ticketControl.tickets.length);

        socket.broadcast.emit(LAST_TICKET_SOCKET_PATH, `Ticket ${ticketControl.lastTicket}`);
    });

    socket.on(SERVING_TICKET_SOCKET_PATH, (payload, callback) => {
        const { desktop } = payload;
        if (!desktop) {
            return callback({
                ok: false,
                msg: 'Desktop is required'
            })
        }

        const ticket = ticketControl.serveTicket(desktop);

        if (!ticket) {
            return callback({
                ok: false,
                msg: 'There is not more tickets to serve'
            })
        }

        socket.broadcast.emit(LAST_TICKETS_SOCKET_PATH, ticketControl.lastFourTicket);
        socket.emit(PENDENT_TICKET_SOCKET_PATH, ticketControl.tickets.length);
        socket.broadcast.emit(PENDENT_TICKET_SOCKET_PATH, ticketControl.tickets.length);

        return callback({
            ok: true,
            ticket
        })
    });
}
