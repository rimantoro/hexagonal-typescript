import { getManager, createConnection } from 'typeorm';
import { DateTime } from 'luxon';

import { User, Role } from '../../entity/user';
import { User as UserEntity } from '../../../adapters/database/postgresql/entities/user.entity';

import { IUserUseCases } from "./interfaces";
import { IUserRepository } from '../../../ports/output/database/IUserRepository'


export class UserUsecase implements IUserUseCases {
  constructor(private userRepository: IUserRepository) {
  }

  async getUserByUsername(uname: string): Promise<User> {
    try {
        return await this.userRepository.getOneByUsername(uname)
    } catch (err) {
        throw new Error(err);
        
    }
  }

  async createNewUserAndSave(user: User): Promise<boolean> {
    const userEty = new UserEntity();
    const now = DateTime.now();

    await user.setHashedPass(user.password);

    userEty.username = user.username;
    userEty.password = user.password;
    userEty.fname = user.fname;
    userEty.lname = user.lname;
    userEty.birthdate = user.birthdate;
    userEty.isVerified = user.isVerified;
    userEty.status = user.status;

    userEty.time = {
      createdAt: now.toString(),
      updatedAt: now.toString(),
      deletedAt: null
    };

    return await this.userRepository.createOne(userEty);
  }

  async validatePassword(username: string, plainPass: string): Promise<boolean> {
    try {
        const user = this.getUserByUsername(username)
        return user.then(function (me) {
            return me.validatePassword(plainPass);
          })
          .catch(function (err) {
            throw new Error(err);
          })
    } catch (err) {
        throw new Error(err);
    }
  }
  
}