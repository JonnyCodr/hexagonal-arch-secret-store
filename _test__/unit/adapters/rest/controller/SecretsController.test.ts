import {NextFunction, request, Request, response, Response} from "express";
import {SecretStorer} from "../../../../../src/domain/ports/in/SecretStorer";
import {SecretsController} from "../../../../../src/adapters/rest/controller/SecretsController";
import {ValidationError} from "../../../../../src/adapters/rest/controller/errors/ValidationError";

describe('Secrets controller test', function () {

    it('should throw validation error if the body of the request is not provided', function () {

        const req: Request = expect.any(request);
        const resp: Response = expect.any(response);
        const next: NextFunction = jest.fn();

        const secretStorer: SecretStorer = {
            storeSecret: jest.fn(),
        }

        const secretsController = new SecretsController(secretStorer);
        secretsController.createSecret(req, resp, next);

        expect(next).toBeCalledTimes(1);
        expect(next).toBeCalledWith(new ValidationError('Request body not valid'));
    });

    it('should throw validation error if the body does not have a secret', function () {

        const req: Request = expect.any(request);
        req.body = {abc: 'abc'};
        const resp: Response = expect.any(response);
        const next: NextFunction = jest.fn();

        const secretStorer: SecretStorer = {
            storeSecret: jest.fn(),
        }

        const secretsController = new SecretsController(secretStorer);
        secretsController.createSecret(req, resp, next);

        expect(next).toBeCalledTimes(1);
        expect(next).toBeCalledWith(new ValidationError('Request body not valid'));
    });

    it('should throw validation error if secret is not of type string', function () {

        const req: Request = expect.any(request);
        req.body = {abc: 'abc'};
        const resp: Response = expect.any(response);
        const next: NextFunction = jest.fn();

        const secretStorer: SecretStorer = {
            storeSecret: jest.fn(),
        }

        const secretsController = new SecretsController(secretStorer);
        secretsController.createSecret(req, resp, next);

        expect(next).toBeCalledTimes(1);
        expect(next).toBeCalledWith(new ValidationError('Request body not valid'));
    });

    it('should create a valid secret', async function () {

        const req: Request = expect.any(request);
        req.body = {secret: '123456qwerty'};
        const res: Response = expect.any(response);
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn()
        const next: NextFunction = jest.fn();

        const secretStorer: SecretStorer = {
            storeSecret: jest.fn().mockResolvedValue('123456qwerty'),
        }

        const secretsController = new SecretsController(secretStorer);
        await secretsController.createSecret(req, res, next);

        expect(next).toBeCalledTimes(0);
        expect(res.status).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(201);
        expect(res.json).toBeCalledTimes(1)
        expect(res.json).toBeCalledWith({urlId: '123456qwerty'});
    });

});
