import DatabaseAdapter from '../adapters/database/database.singleton';
import DomainUseCases from './useCases';

import { IUserUseCases, IAuthUserCases } from './useCases/user/interfaces';
export interface IDomainUseCasesPort {
    userUseCases: IUserUseCases
    authUserUseCases: IAuthUserCases
}

export default class DomainUseCasesSingleton {
    private static instance: DomainUseCasesSingleton;
    public DomainUseCases: IDomainUseCasesPort;


    private constructor() { }
    public static async getInstance(): Promise<DomainUseCasesSingleton> {
        if (!DomainUseCasesSingleton.instance) {
            const databaseAdapter = await DatabaseAdapter.getInstance()
            DomainUseCasesSingleton.instance = new DomainUseCasesSingleton();
            DomainUseCasesSingleton.instance.DomainUseCases = new DomainUseCases(databaseAdapter.adapter)
        }
        return DomainUseCasesSingleton.instance;
    }
}
