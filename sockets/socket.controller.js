import { CLIENT_CONNECTED, CLIENT_DISCONNECTED } from "../constants/messages.constant.js";
import { DISCONNECTION_SOCKET_PATH, SEND_MESSAGE_SOCKET_PATH } from "../constants/routes.constant.js";

export const socketController = socket => {
    console.log(CLIENT_CONNECTED, socket.id);
    socket.on(DISCONNECTION_SOCKET_PATH, () => {
        console.log(CLIENT_DISCONNECTED, socket.id);
    })

    socket.on(SEND_MESSAGE_SOCKET_PATH, (payload, callback) => {
        const id = 123456;
        if (callback) callback({id, date: new Date()});

        socket.broadcast.emit(SEND_MESSAGE_SOCKET_PATH, payload);
    })
}
