import { IUserRepository } from "./IUserRepository";

export default interface IDatabasePort {
    InitAdapter(): Promise<void>;
    UserRepository: IUserRepository;
}