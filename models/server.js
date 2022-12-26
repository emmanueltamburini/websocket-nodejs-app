import express from 'express';
import cors from 'cors';

import { exampleRouter } from '../routes/index.js';
import { SERVER_RUNNING } from '../constants/messages.constant.js';
import { EXAMPLE_PATH, LOCAL_PUBLIC_FOLDER_PATH } from '../constants/routes.constant.js';
export default class Server {

    constructor() {
        this.app = express();
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
        this.app.listen(this.port, () => {
            console.log(SERVER_RUNNING(this.port));
        });
    }

}
