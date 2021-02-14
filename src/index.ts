//load configuration from .env file and accessed by the process global object. 
import * as dotenv from "dotenv";
import { createConnection, getConnection } from "typeorm";
import { stringify } from "uuid";

dotenv.config();

import ExpressSingleton from './adapters/express/express.singleton'

const main = async ()=>{
    const expressInstace = await ExpressSingleton.getInstance()
    expressInstace.adapter.startServer(process.env.HTTP_PORT);
}

main();