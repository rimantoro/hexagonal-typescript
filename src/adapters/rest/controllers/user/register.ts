import { body, validationResult } from 'express-validator'

import RestError from '../../../../utils/restError'
import DomainUseCasesSingleton from '../../../../domain/dominUseCases.singleton';
import { IUserUseCases, IAuthUserCases } from '../../../../domain/useCases/user/interfaces';
import { ERRMSG } from '../../../../utils/messages'

import { User as UserMdl } from '../../../../domain/entity/user'
import { User } from '../../../../adapters/database/postgresql/entities/user.entity'

export class UserRegsiterControllers {

    private userUseCases: IUserUseCases;
    private authUseCases: IAuthUserCases;

    
    constructor(private app) {
        this.control();
    }

    public async control() {
        const domainUseCasesInstance = DomainUseCasesSingleton.getInstance();
        this.userUseCases = (await domainUseCasesInstance).DomainUseCases.userUseCases
        this.authUseCases = (await domainUseCasesInstance).DomainUseCases.authUserUseCases

        this.app.post('/user/create'
            , body('username').notEmpty()
            , body('password').notEmpty()
            , body('first_name').notEmpty()
            , body('birthdate').isDate()
            , this.createUser)
    }

    createUser = (req: any, res: any, next: any) => {
        // input validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'error',
                message: 'request validation mismatch',
                errors: errors.array()
            });
        }

        const body = req.body;

        const user = new UserMdl();
        user.username =  body.username;
        user.password = body.password;
        user.fname = body.first_name;
        user.lname = body.last_name;
        user.birthdate = body.birthdate;

        this.userUseCases.createNewUserAndSave(user)
            .then((saved) => {
                console.debug('result: ' + saved)     
                if (saved) {
                    return res.status(201).json({
                        status: 'success',
                        data: {}
                    });
                } else {
                    console.error('create user failed')          
                    const errorMessage = 'server could not process request';
                    const restError = RestError(errorMessage);
                    return res.status(500).json(restError);
                }
            })
            .catch((err) => {      
                console.error(err)          
                const errorMessage = 'server could not process request';
                const restError = RestError(errorMessage);
                return res.status(500).json(restError);
            })
    }

}