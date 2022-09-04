import {NextFunction, Request, Response} from "express";
import {ValidationError} from "./errors/ValidationError";
import {SecretRetriever} from "../../../domain/ports/in/SecretRetriever";
import {UrlId} from "../../../domain/Models/UrlId";


export class SecretsByIdController {

    constructor(private secretRetriever: SecretRetriever) {}

    retrieveSecret = async (req: Request, resp: Response, next: NextFunction) => {
        try {
            this.validateRequest(req);
            const urlId = new UrlId(req.params.urlId);
            const secret = await this.secretRetriever.retrieveSecret(urlId)
            resp.status(200).json(secret);
        } catch (err) {
            next(err)
        }
    }

    private validateRequest(req: Request) {
        if (!req.params?.urlId) throw new ValidationError('URL is not valid');
    }
}
