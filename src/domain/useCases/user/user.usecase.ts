import { User, Role } from '../../entity/user';
import { IUserUseCases } from "./interfaces";
import { IUserRepository } from '../../../ports/output/database/IUserRepository'


export class UserUsecase implements IUserUseCases {
  constructor(private userRepository: IUserRepository) {
  }

  async getUserByUsername(uname: string): Promise<User> {
    try {
        return await this.userRepository.getOneByUsername(uname)
    } catch (err) {
        return Promise.reject(err)
    }
  }

  async createNewUserAndSave(user: User): Promise<boolean> {
    try {
        const defaultRole = new Role("guest", "guest", "", "1" );

        user.setHashedPass(user.password)
        user.attachRoles(defaultRole)
        return await this.userRepository.createOne(user)
    } catch (err) {
        return Promise.reject(err)
    }
  }

  async validatePassword(username: string, plainPass: string): Promise<boolean> {
    try {
        const user = this.getUserByUsername(username)
        user.then(function (me) {
            return me.validatePassword(plainPass);
          })
          .catch(function (err) {
            throw new Error(err);
          })
    } catch (err) {
        return Promise.reject(err);
    }
  }
  
}