import mongoose from "mongoose";
import supertest from "supertest";
import server from "../../src/server";

const request = supertest(server.app);

import {SecretModel} from "../../src/adapters/externalServices/repositories/SecretModel";

describe('Get Secret from one time secret api integration test', function () {
    it('should retrieve the secret one time', async function () {
        // mongoose.connection.readyState = 1;
        SecretModel.findOne = jest.fn().mockResolvedValue({secret: '123zwie'});
        SecretModel.deleteOne = jest.fn();

        const res = await request.get('/api/secret/123456qwerty');

        expect(res.status).toBe(200);
        expect(res.body).toEqual({secret: '123zwie'});

        expect(SecretModel.findOne).toHaveBeenCalledTimes(1);
        expect(SecretModel.findOne).toHaveBeenCalledWith({urlId: '123456sdfvojenrvq'});
        expect(SecretModel.deleteOne).toHaveBeenCalledTimes(1);
        expect(SecretModel.deleteOne).toHaveBeenCalledWith({urlId: '123456sdfvojenrvq'});
    })

    it('should retrieve an error if the secret does not exist in the database', async function () {
        // mongoose.connection.readyState = 1;
        SecretModel.findOne = jest.fn().mockResolvedValue(null);
        SecretModel.deleteOne = jest.fn();

        const res = await request.get('/api/secret/123456qwerty');

        expect(res.status).toBe(404);
        expect(res.body).toEqual({title:'SecretNotFoundInRepositoryError', message:'Secret was not found in the repository'});

        expect(SecretModel.findOne).toHaveBeenCalledTimes(1);
        expect(SecretModel.findOne).toHaveBeenCalledWith({urlId: '123456sdfvojenrvq'});
        expect(SecretModel.deleteOne).toHaveBeenCalledTimes(1);
        expect(SecretModel.deleteOne).toHaveBeenCalledWith({urlId: '123456sdfvojenrvq'});
    })
});
