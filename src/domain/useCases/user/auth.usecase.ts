import jwt from "jsonwebtoken";

import { IAuthUserCases } from "./interfaces";
import { IUserRepository } from "../../../ports/output/database/IUserRepository";


export class UserAuthUsecase implements IAuthUserCases {
  constructor(private userRepository: IUserRepository) {
  }
  
  generateJWTToken(jwtkey: string, payload: any): string{
    // set for 1 hour
    return jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      data: payload
    }, jwtkey)
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

}