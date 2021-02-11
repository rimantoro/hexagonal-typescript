import jwt from "jsonwebtoken";

import { IAuthUserCases } from "./interfaces";
import { IUserRepository } from "../../../ports/output/database/IUserRepository";



export class UserAuthUsecase implements IAuthUserCases {

  constructor(private userRepository: IUserRepository) {
  }
  
  // example of opt = {
  //   issuer:  "",
  //   subject:  "",
  //   audience:  "",
  //   expiresIn:  "1h",
  //   algorithms:  ["RS256", "RS512"]
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

}