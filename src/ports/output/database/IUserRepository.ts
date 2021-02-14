import { User } from '../../../domain/entity/user';
import { User as UserEntity } from '../../../adapters/database/postgresql/entities/user.entity';
export interface IUserRepository {
    createOne(user: UserEntity): Promise<boolean>
    getMany(): Promise<User[]>
    getOneByID(ID: string): Promise<User>
    getOneByUsername(username: string): Promise<User>
}