import { getConnection } from 'typeorm'
import { IUserRepository } from '../../../ports/output/database/IUserRepository';
import { UserEntity } from './schemas/user.schema';
import { User } from '../../../domain/entity/user';
import { ERRMSG } from '../../../utils/messages';

export default class UserRepository implements IUserRepository {

    async createOne(user: User): Promise<boolean> {
        try {
            getConnection()
                .createQueryBuilder()
                .insert()
                .into(UserEntity)
                .values(user)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    
    async getMany(): Promise<User[]> {
        throw new Error('Method not implemented.');
    }

    async getOneByID(ID: string): Promise<User> {
        try {
            const conn = getConnection()
            return await conn
                .getRepository(User)
                .createQueryBuilder("user")
                .where("user.id = :id", { id: ID })
                .getOne()
        } catch (error) {
            throw new Error(ERRMSG.NOTFOUND.user);
        }
    }

    async getOneByUsername(username: string): Promise<User> {
        try {
            const conn = getConnection()
            return await conn
                .getRepository(User)
                .createQueryBuilder("user")
                .where("user.username = :username", { username: username })
                .getOne()
        } catch (error) {
            throw new Error(ERRMSG.NOTFOUND.user);
        }
    }
}