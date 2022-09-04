import {NextFunction, Request, Response} from "express";
import {SecretStorer} from "../../../domain/ports/in/SecretStorer";
import {ValidationError} from "./errors/ValidationError";
import {Secret} from "../../../domain/Models/Secret";


export class SecretsController {

    constructor(private secretStorer: SecretStorer) {}

    createSecret = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.validateRequest(req);
            const secret = new Secret(req.body.secret);
            const urlId = await this.secretStorer.storeSecret(secret);
            res.status(201).json({urlId: urlId});
        } catch (err) {
            next(err);
        }
    }

    private validateRequest(req: Request) {
        if(!req.body || !req.body?.secret || typeof req.body?.secret !== 'string') (new ValidationError('Request body not valid'));
    }

}
