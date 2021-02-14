import express from 'express';

import pingFactory from '../rest/controllers/ping'
import { JWTControllers } from '../rest/controllers/auth/jwt'
import { UserRegsiterControllers } from '../rest/controllers/user/register'


export default class ExpressServer { 

    private app
    constructor() {
        this.app = express()
        this.initAdapter();
        this.initControllers();
    }

    private initAdapter():void {
        this.app.use(express.json());
    }

    private initControllers(): void {
        const pingController = pingFactory();
        this.app.get('/ping', pingController);
        
        const jwtControllers = new JWTControllers(this.app)
        const userControllers = new UserRegsiterControllers(this.app)
    }

    public startServer(port: string): void {
        console.log("server is starting on port:", port);
        this.app.listen(Number(port));
    }


}