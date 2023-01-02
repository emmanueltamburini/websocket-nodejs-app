const desktopTitle = document.querySelector('h1');
const servingTicketButton = document.querySelector('button');
const servingTicketLabel = document.querySelector('small');
const noMoreTicketsAlert = document.querySelector('.alert');
const pendentsH1 = document.querySelector('#pendentsH1');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desktop')) {
    window.location = 'index.html';
    throw new Error('Desktop is required');
}

const desktop = searchParams.get('desktop');
desktopTitle.innerText = desktop;
noMoreTicketsAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    servingTicketButton.disabled = false;
});

socket.on('disconnect', () => {
    servingTicketButton.disabled = true;
});

socket.on('pendent-ticket', pendentTickets => {
    pendentsH1.style.display = '';
    noMoreTicketsAlert.style.display = 'none';
    pendentsH1.innerText = pendentTickets;
});

servingTicketButton.addEventListener( 'click', () => {
    const payload = {
        desktop
    };

    socket.emit('serving-ticket', payload, response => {
        const {ok, ticket, msg} = response

        if (!ok) {
            servingTicketLabel.innerText =  `Nobody`;
            noMoreTicketsAlert.innerText = msg;
            noMoreTicketsAlert.style.display = '';
            pendentsH1.style.display = 'none';
            return;
        }
        servingTicketLabel.innerText =  `Ticket ${ticket.number}`;
    });

});