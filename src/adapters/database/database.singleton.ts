import IDatabasePort from '../../ports/output/database/IDatabasePort';
// import MongoDriver from './mongo/mongo_Driver'
import SQLDriver from './postgresql/driver'
export default class DatabaseSingleton {
    private static instance: DatabaseSingleton;
    public adapter: IDatabasePort;


    private constructor() { }

    public static async getInstance(): Promise<DatabaseSingleton> {
        if (!DatabaseSingleton.instance) {
            DatabaseSingleton.instance = new DatabaseSingleton();
            
            // mongo example
            // DatabaseSingleton.instance.adapter = new MongoDriver(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_NAME);
            
            // postgre example
            DatabaseSingleton.instance.adapter = new SQLDriver(process.env.DB_TYPE, process.env.DB_HOST, process.env.DB_PORT, process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS);
            
            await DatabaseSingleton.instance.adapter.InitAdapter();
        }
        return DatabaseSingleton.instance;
    }
}
