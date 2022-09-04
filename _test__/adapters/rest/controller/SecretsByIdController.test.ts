import {ValidationError} from "../../../../src/adapters/rest/controller/errors/ValidationError";
import {NextFunction, request, Request, response, Response} from "express";

import { SecretsByIdController } from '../../../../src/adapters/rest/controller/SecretsByIdController';
import {SecretNotFoundInRepositoryError} from "../../../../src/domain/Models/errors/SecretNotFoundInRepositoryError";
import {SecretRetriever} from "../../../../src/domain/ports/in/SecretRetriever";
import {Secret} from "../../../../src/domain/Models/Secret";

describe('Secrets by id test', function () {

    it('should throw an error when sending an invalid url', function () {

        const req: Request = expect.any(request);
        const resp: Response = expect.any(response);
        const next: NextFunction = jest.fn();

        const secretRetriever: SecretRetriever = {
            retrieveSecret: jest.fn(),
        }

        const secretsByIdController = new SecretsByIdController(secretRetriever);
        secretsByIdController.retrieveSecret(req, resp, next);

        expect(next).toBeCalledTimes(1);
        expect(next).toBeCalledWith(new ValidationError('URL is not valid'));
    });

    it('should throw an error when secret is not found', async function () {

        const req: Request = expect.any(request);
        req.params = { urlId: '123456sdfvojenrvq' };
        const resp: Response = expect.any(response);
        const next: NextFunction = jest.fn();

        const secretRetriever: SecretRetriever = {
            retrieveSecret: jest.fn().mockImplementation(async () => {
                throw new SecretNotFoundInRepositoryError();
            }),
        }

        const secretsByIdController = new SecretsByIdController(secretRetriever);
        await secretsByIdController.retrieveSecret(req, resp, next);

        expect(next).toBeCalledTimes(1);
        expect(next).toBeCalledWith(new SecretNotFoundInRepositoryError());
    });

    it('should return a secret when it is found', async function () {

        const req: Request = expect.any(request);
        req.params = { urlId: '123456sdfvojenrvq' };
        const resp: Response = expect.any(response);
        resp.status = jest.fn().mockReturnThis()
        resp.json = jest.fn()

        const next: NextFunction = jest.fn();

        const secretRetriever: SecretRetriever = {
            retrieveSecret: jest.fn().mockResolvedValue(new Secret('123zwie')),
        }

        const secretsByIdController = new SecretsByIdController(secretRetriever);
        await secretsByIdController.retrieveSecret(req, resp, next);

        expect(next).toBeCalledTimes(0);
        expect(resp.status).toBeCalledTimes(1);
        expect(resp.status).toBeCalledWith(200);
        expect(resp.json).toBeCalledTimes(1);
        expect(resp.json).toBeCalledWith({secret: '123zwie'});
    });
});
