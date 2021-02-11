import { body, validationResult } from 'express-validator'

import RestError from '../../../../utils/restError'
import DomainUseCasesSingleton from '../../../../domain/dominUseCases.singleton';
import { IUserUseCases, IAuthUserCases } from '../../../../domain/useCases/user/interfaces';
import { ERRMSG } from '../../../../utils/messages'

export class JWTControllers {

    private userUseCases: IUserUseCases;
    private authUseCases: IAuthUserCases;

    private payload: object
    private jwtkey: string

    
    constructor(private app) {
        this.payload = { fname: 'sergey', lname: 'imanovski' }
        this.jwtkey = process.env.JWT_KEY
        this.control();
    }

    public async control() {
        const domainUseCasesInstance = DomainUseCasesSingleton.getInstance();
        this.userUseCases = (await domainUseCasesInstance).DomainUseCases.userUseCases
        this.authUseCases = (await domainUseCasesInstance).DomainUseCases.authUserUseCases

        this.app.post('/token'
            , body('username').notEmpty()
            , body('password').notEmpty()
            , this.createToken)

        this.app.post('/token/validate', this.validateToken)
    }

    createToken = (req: any, res: any, next: any) => {
        // input validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                status: 'error',
                message: 'request validation mismatch',
                errors: errors.array()
            });
        }

        this.authUseCases.generateJWTTokenForUser(req.body.username, req.body.password)
            .then((token) => {
                res.status(200).json({
                    status: 'success',
                    data: {
                        token: token
                    }
                });
            })
            .catch((err) => {                
                if (err.message === ERRMSG.LOGIN.invalidLogin || err.message === ERRMSG.NOTFOUND.user) {
                    const errorMessage = ERRMSG.LOGIN.invalidLogin;
                    const restError = RestError(errorMessage);
                    res.status(401).json(restError);
                } else {
                    const errorMessage = 'server could not process request';
                    const restError = RestError(errorMessage);
                    res.status(500).json(restError);
                }
            })
    }

    validateToken = async (req: any, res: any, next: any) => {
        try {
            const authHeader = req.headers.authorization;
            if (authHeader) {
                const token = authHeader.split(' ')[1];
                this.authUseCases.validateJWTToken(this.jwtkey, token).then((payload) => {
                    res.status(200).json({
                        status: 'success',
                        data: payload
                    });
                })
            } else {
                throw new Error('token is missing');
            }
        } catch (err) {
            console.error('validate token error :', err);
            if (err.message == 'token is missing') {
                const restError = RestError(err.message);
                res.status(400).json(restError)
                return;
            }

            const restError = RestError('server could not process request');
            res.status(500).json(restError)
            return;
        }
    }

}