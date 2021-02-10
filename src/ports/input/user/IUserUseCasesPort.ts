import { User } from '../../../domain/entity/user';

export interface IUserUseCasesPort {
    getUserByUsername(uname: string): Promise<User>
    validatePassword(username: string, plainPass: string): Promise<boolean>
    createNewUserAndSave(user: User): Promise<boolean>
}