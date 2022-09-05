import {NextFunction, request, Request, response, Response} from "express";
import {errorHandler} from "../../../../../src/adapters/rest/middlwware/ErrorHandler";
import {ValidationError} from "../../../../../src/adapters/rest/controller/errors/ValidationError";


describe('ErrorHandler test', function () {
    it('should send an uncontrolled error', async function () {
        const req: Request = expect.any(request);
        const res: Response = expect.any(response);
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn()
        const next: NextFunction = jest.fn();

        const error = new Error('Uncontrolled error');
        errorHandler(error, req, res, next);


        expect(res.status).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalledTimes(1)
        expect(res.json).toBeCalledWith({title: 'Internal Server Error', message: 'Internal Server Error'});
    });

    it('should send a validation error', async function () {
        const req: Request = expect.any(request);
        const res: Response = expect.any(response);
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn()
        const next: NextFunction = jest.fn();

        const error = new ValidationError('body is not present');
        errorHandler(error, req, res, next);


        expect(res.status).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledTimes(1)
        expect(res.json).toBeCalledWith(
            {
                title: 'ValidationError',
                message: 'body is not present'});
    });
});
