import IDomainUseCasesPort from "../../ports/input/IDomainUseCasesPort";
import IDatabasePort from "../../ports/output/database/IDatabasePort";

import { IAuthUserCases, IUserUseCases } from "./user/interfaces";
import { UserAuthUsecase } from './user/auth.usecase'
import { UserUsecase } from './user/user.usecase'

export default class DomainUseCases implements IDomainUseCasesPort {

    constructor(private databasePort: IDatabasePort) {

    }

    public userUseCases: IUserUseCases = new UserUsecase(this.databasePort.UserRepository)
    public authUserUseCases: IAuthUserCases = new UserAuthUsecase(this.databasePort.UserRepository)
}
