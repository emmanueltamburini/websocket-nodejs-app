const ticketSpan1 = document.querySelector('#ticketSpan1');
const desktopSpan1 = document.querySelector('#desktopSpan1');
const ticketSpan2 = document.querySelector('#ticketSpan2');
const desktopSpan2 = document.querySelector('#desktopSpan2');
const ticketSpan3 = document.querySelector('#ticketSpan3');
const desktopSpan3 = document.querySelector('#desktopSpan3');
const ticketSpan4 = document.querySelector('#ticketSpan4');
const desktopSpan4 = document.querySelector('#desktopSpan4');

const socket = io();

socket.on('last-tickets', payload => {
    const [ticket1, ticket2, ticket3, ticket4] = payload;

    const audio = new Audio('../audio/new-ticket.mp3');
    audio.play();

    if(ticket1) {
        ticketSpan1.innerText = `Ticket ${ticket1.number}`;
        desktopSpan1.innerText = ticket1.desktop;    
    }

    if(ticket2) {
        ticketSpan2.innerText = `Ticket ${ticket2.number}`;
        desktopSpan2.innerText = ticket2.desktop;    
    }

    if(ticket3) {
        ticketSpan3.innerText = `Ticket ${ticket3.number}`;
        desktopSpan3.innerText = ticket3.desktop;    
    }

    if(ticket4) {
        ticketSpan4.innerText = `Ticket ${ticket4.number}`;
        desktopSpan4.innerText = ticket4.desktop;    
    }
});
