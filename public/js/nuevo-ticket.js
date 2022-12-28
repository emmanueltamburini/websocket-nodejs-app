const newTicketSpan = document.querySelector('#newTicketSpan');
const generateTokenButton = document.querySelector('#generateTokenButton');

const socket = io();

socket.on('connect', () => {
    generateTokenButton.disabled = false;
});

socket.on('disconnect', () => {
    generateTokenButton.disabled = true;
});

socket.on('last-ticket', lastTicket => {
    newTicketSpan.innerText = lastTicket;
})


generateTokenButton.addEventListener( 'click', () => {
    socket.emit( 'next-ticket', null, ( ticket ) => {
        newTicketSpan.innerText = ticket;
    });

});