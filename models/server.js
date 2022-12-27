import express from 'express';
import cors from 'cors';
import http from 'http'
import {Server as ServerIO} from 'socket.io'

import { exampleRouter } from '../routes/index.js';
import { SERVER_RUNNING } from '../constants/messages.constant.js';
import { EXAMPLE_PATH, LOCAL_PUBLIC_FOLDER_PATH } from '../constants/routes.constant.js';
export default class Server {

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new ServerIO(this.server);

        this.port = process.env.PORT;
        this.paths = {
            example: EXAMPLE_PATH
        }

        this.middleware();

        this.routes();
    }

    middleware() {
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static(LOCAL_PUBLIC_FOLDER_PATH));
    }

    routes() {
        this.app.use(this.paths.example, exampleRouter);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(SERVER_RUNNING(this.port));
        });
    }

}
