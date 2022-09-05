import {NextFunction, request, Request, response, Response} from "express";
import {ValidationError} from "../controller/errors/ValidationError";

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {

    if (error instanceof ValidationError) {
        res.status(400).json({title: error.name, message: error.message});
    } else {
        res.status(500).json({title: 'Internal Server Error', message: 'Internal Server Error'});
    }
}
