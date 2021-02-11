import { User } from '../../entity/user';

export interface IUserUseCases {
  getUserByUsername(uname: string): Promise<User>
  validatePassword(username: string, plainPass: string): Promise<boolean>
  createNewUserAndSave(user: User): Promise<boolean>
}
export interface IAuthUserCases {
  generateJWTToken(jwtkey: string, payload: any, opt: {}): string
  validateJWTToken(jwtkey: string, token: string): Promise<any>
  
  generateJWTTokenForUser(username: string, password: string): Promise<string>
}
