import {NextFunction, request, Request, response, Response} from "express";
import {ValidationError} from "../controller/errors/ValidationError";
import {UrlIdTooShortError} from "../../../domain/Models/errors/UrlIdTooShortError";
import {SecretTooShortError} from "../../../domain/Models/errors/SecretTooShortError";
import {SecretNotFoundInRepositoryError} from "../../../domain/Models/errors/SecretNotFoundInRepositoryError";

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {

    if (error instanceof ValidationError || error instanceof UrlIdTooShortError || error instanceof SecretTooShortError) {
        res.status(400).json({title: error.name, message: error.message});
    }else if (error instanceof SecretNotFoundInRepositoryError){
        res.status(404).json({title: error.name, message: error.message});
    } else {
        res.status(500).json({title: 'Internal Server Error', message: 'Internal Server Error'});
    }
}
