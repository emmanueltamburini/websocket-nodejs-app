import data from '../db/data.json' assert { type: "json" };
import path from 'path';
import fs from 'fs';
import * as url from 'url';
import { DB_PATH, LOCAL_PREVIOUS_PATH } from '../constants/routes.constant.js';

const __dirname = url.fileURLToPath(new URL(LOCAL_PREVIOUS_PATH, import.meta.url));

class Ticket  {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop; 
    }
}

export default class TicketControl {

    constructor() {
        this.lastTicket = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFourTicket = [];

        this.loadDB();
    }

    get toJson() {
        return {
            lastTicket: this.lastTicket,
            today: this.today,
            tickets: this.tickets,
            lastFourTicket: this.lastFourTicket,
        }
    }

    loadDB() {
        const {lastTicket, today, tickets, lastFourTicket} = data;
        if(today === this.today) {
            this.tickets = tickets;
            this.lastFourTicket = lastFourTicket;
            this.lastTicket = lastTicket;
        } else {
            this.saveDB();
        }
    }

    saveDB() {
        const dbPath =  path.join(__dirname, DB_PATH);
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson))
    }

    next() {
        this.lastTicket +=1;
        const ticket = new Ticket(this.lastTicket, null);
        this.tickets.push(ticket);

        this.saveDB();
        return `Ticket ${ticket.number}`;
    }

    serveTicket(desktop) {
        if(this.tickets.length === 0) {
            return null;
        }

        const ticket = this.tickets.shift();

        ticket.desktop = desktop;

        this.lastFourTicket.unshift(ticket);

        if (this.lastFourTicket.length > 4) {
            this.lastFourTicket.splice(-1, 1);
        }

        this.saveDB();

        return ticket;
    }
}