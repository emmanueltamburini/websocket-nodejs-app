const onlineSocket = document.querySelector('#online-socket');
const offlineSocket = document.querySelector('#offline-socket');

const txtMessage = document.querySelector('#txt-message');
const btnSend = document.querySelector('#btn-send');

const socket = io();

socket.on('connect', () => {
    onlineSocket.style.display = '';
    offlineSocket.style.display = 'none';
});

socket.on('disconnect', () => {
    onlineSocket.style.display = 'none';
    offlineSocket.style.display = ' ';
});

socket.on('send-message', payload => {
    console.log(payload)
});

btnSend.addEventListener('click', () => {
    const message = txtMessage.value;
    const payload = {
        message,
        id: '123',
        date: new Date().getTime()
    }
    socket.emit('send-message', payload, id => {
        console.log('From the server', id);
    });
})