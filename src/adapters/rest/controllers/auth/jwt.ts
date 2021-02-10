import express from 'express';

import RestError from '../../../../utils/restError'
import DomainUseCasesSingleton from '../../../../domain/dominUseCases.singleton';
import { IUserUseCases, IAuthUserCases } from '../../../../domain/useCases/user/interfaces';

export class JWTControllers {

    private userUseCases: IUserUseCases;
    private authUseCases: IAuthUserCases;

    private payload: object
    private jwtkey: string

    
    constructor(private app: express) {
        this.payload = { fname: "sergey", lname: "imanovski" }
        this.jwtkey = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        this.control();
    }

    public async control() {
        const domainUseCasesInstance = DomainUseCasesSingleton.getInstance();
        this.userUseCases = (await domainUseCasesInstance).DomainUseCases.userUseCases
        this.authUseCases = (await domainUseCasesInstance).DomainUseCases.authUserUseCases

        this.app.post('/token', this.createToken)
        this.app.post('/token/validate', this.validateToken)
    }

    createToken = (req: any, res: any, next: any) => {
        try {
            const token = this.authUseCases.generateJWTToken(this.jwtkey, this.payload)

            res.status(200).json({
                status: "success",
                data: {
                    token: token
                }
            });
        } catch (err) {
            console.error("generate token error :", err);
            if (err.message === 'name is missing.') {
                const errorMessage = err.message;
                const restError = RestError(errorMessage);
                res.status(400).json(restError)
                return;
            }

            const errorMessage = "server could not process request";
            const restError = RestError(errorMessage);
            res.status(500).json(restError)
        }
    }

    validateToken = async (req: any, res: any, next: any) => {
        try {
            const authHeader = req.headers.authorization;
            if (authHeader) {
                const token = authHeader.split(' ')[1];
                this.authUseCases.validateJWTToken(this.jwtkey, token).then((payload) => {
                    res.status(200).json({
                        status: "success",
                        data: { 
                            payload: payload 
                        }
                    });
                })
            } else {
                throw new Error("token is missing");
            }
        } catch (err) {
            console.error("validate token error :", err);
            if (err.message == 'token is missing') {
                const restError = RestError(err.message);
                res.status(400).json(restError)
                return;
            }

            const restError = RestError("server could not process request");
            res.status(500).json(restError)
            return;
        }
    }

}