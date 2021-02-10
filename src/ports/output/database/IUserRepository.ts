import { User } from '../../../domain/entity/user';
export interface IUserRepository {
    createOne(user: User): Promise<boolean>
    getMany(): Promise<User[]>
    getOneByID(ID: string): Promise<User>
    getOneByUsername(username: string): Promise<User>
}