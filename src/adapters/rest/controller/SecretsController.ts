import {NextFunction, Request, Response} from "express";
import {SecretStorer} from "../../../domain/ports/in/SecretStorer";
import {ValidationError} from "./errors/ValidationError";
import {Secret} from "../../../domain/Models/Secret";

/**
 * @class SecretsController
 * @description This class is used to handle the requests for the secrets
 * @version 1.0.0
 */
export class SecretsController {

    constructor(private secretStorer: SecretStorer) {}

    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {Promise<Response>} response
     * @description This function is used to create a secret
     * @version 1.0.0
     */
    createSecret = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.validateRequest(req);

            const urlId = await this.secretStorer.storeSecret(new Secret(req.body.secret));

            res.status(201).json({urlId: urlId});
        } catch (e) {
            next(e);
        }
    }

    /**
     * @param {Request} req
     * @private
     * @description This function is used to validate the request
     * @version 1.0.0
     */
    private validateRequest(req: Request) {
        if(!req.body || !req.body?.secret || typeof req.body.secret !== 'string') {
            throw new ValidationError('Request body not valid');
        }
    }
}
