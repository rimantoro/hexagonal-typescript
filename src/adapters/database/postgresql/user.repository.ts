import { getConnection, getManager } from 'typeorm'
import { IUserRepository } from '../../../ports/output/database/IUserRepository';
import { User } from './entities/user.entity';
import { User as UserMdl } from '../../../domain/entity/user';
import { ERRMSG } from '../../../utils/messages';

export default class UserRepository implements IUserRepository {

    async createOne(user: User): Promise<boolean> {
        const mgr = getManager();
        await mgr.save(user);
        return true
    }
    
    async getMany(): Promise<UserMdl[]> {
        throw new Error('Method not implemented.');
    }

    async getOneByID(ID: string): Promise<UserMdl> {
        try {
            const conn = getConnection()
            return await conn
                .getRepository(UserMdl)
                .createQueryBuilder("user")
                .where("user.id = :id", { id: ID })
                .getOne()
        } catch (error) {
            throw new Error(ERRMSG.NOTFOUND.user);
        }
    }

    async getOneByUsername(username: string): Promise<UserMdl> {
        try {
            const conn = getConnection()
            return await conn
                .getRepository(UserMdl)
                .createQueryBuilder("user")
                .where("user.username = :username", { username: username })
                .getOne()
        } catch (error) {
            throw new Error(ERRMSG.NOTFOUND.user);
        }
    }
}