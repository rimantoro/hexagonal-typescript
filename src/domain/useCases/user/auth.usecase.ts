import jwt from "jsonwebtoken";

import { IAuthUserCases } from "./interfaces";
import { IUserRepository } from "../../../ports/output/database/IUserRepository";
import { ERRMSG } from '../../../utils/messages'



export class UserAuthUsecase implements IAuthUserCases {

  constructor(private userRepository: IUserRepository) {
  }
  
  // example of opt = {
  //   issuer:  "",
  //   subject:  "",
  //   audience:  "",
  //   expiresIn:  "1h",
  //   algorithm:  "HS256"
  // }
  generateJWTToken(jwtkey: string, payload: any, opt: {}): string{
    return jwt.sign({
        data: payload
      }
      , jwtkey
      , opt)
  }

  async validateJWTToken(jwtkey: string, token: string): Promise<any>{
    return jwt.verify(token, jwtkey, function (err, decoded) {
      if (err != undefined) {
        console.error(err);
        throw new Error("token is not valid");
      }
      return decoded
    })
  }

  async generateJWTTokenForUser(username: string, password: any): Promise<string>{
    const res = this.userRepository.getOneByUsername(username).then((user) => {
      const jwtOpts = {
        issuer:  process.env.APP_NAME,
        subject:  '',
        expiresIn:  '1h',
        algorithm:  'HS256'
      }
      
      let payload = {}
      
      if (user.validatePassword(password)) {
        payload = {
          firstname: user.fname,
          lastname: user.lname,
          birthdate: user.birthdate
        }
      } else {
        throw new Error(ERRMSG.LOGIN.invalidLogin);
      }

      return this.generateJWTToken(process.env.JWT_KEY, payload, jwtOpts)
    }).catch((err) => {
      console.error(err);
      throw new Error(err.message);
    })

    return res
  }

}