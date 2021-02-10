//load configuration from .env file and accessed by the process global object. 
import * as dotenv from "dotenv";
dotenv.config();

import ExpressSingleton from './adapters/express/express.singleton'

const main = async ()=>{
    const expressInstace = await ExpressSingleton.getInstance()
    expressInstace.adapter.startServer(process.env.HTTP_PORT);
    
}

main();