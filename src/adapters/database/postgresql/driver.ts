import IDatabasePort from '../../../ports/output/database/IDatabasePort';
import UserRepository from './user.repository'
import { createConnection, Connection, getConnection } from 'typeorm'
import { IUserRepository } from '../../../ports/output/database/IUserRepository';


export default class SQLDriver implements IDatabasePort {

    public UserRepository: IUserRepository

    constructor(private dbType: string, private dbHost: string, private dbPort: string, private dbName: string, private dbUser: string, private dbPass: string) {
        this.UserRepository = new UserRepository();
    }

    public async InitAdapter(): Promise<void> {
        await this.connect({ dbType: this.dbType, dbHost: this.dbHost, dbPort: this.dbPort, dbName: this.dbName, dbUser: this.dbUser, dbPass: this.dbPass });
    }

    public disconnect() {
        getConnection().close()
    }
    private async connect(dbSettings): Promise<any> {
        console.log(`creating Connection to [ ${dbSettings.dbType}://${dbSettings.dbHost}:${dbSettings.dbPort}/${dbSettings.dbName} ]`);

        const conn = await createConnection({
          type: dbSettings.dbType,
          host: dbSettings.dbHost,
          port: dbSettings.dbPort,
          username: dbSettings.dbUser,
          password: dbSettings.dbPass,
          database: dbSettings.dbName,

          // extra options
          maxQueryExecutionTime: 1000,
          logging: process.env.DEBUG ? true : false,
          logger: 'advanced-console'
        });

        return conn;
    }
}

