import supertest from "supertest";
import server from "../../src/server";

const request = supertest(server.app);

import {SecretModel} from "../../src/adapters/externalServices/repositories/SecretModel";


describe('Store Secret from one time secret api integration test', function () {
    it('should store the secret one time', async function () {
        // mongoose.connection.readyState = 1;
        SecretModel.create = jest.fn()

        const res = await request.post('/api/secret/123456qwerty')
            .send({secret: '11'});

        expect(res.status).toBe(201);
        expect(res.body.urlId.length).toBeGreaterThanOrEqual(10);

        expect(SecretModel.findOne).toHaveBeenCalledTimes(1);
        expect(SecretModel.findOne).toHaveBeenCalledWith({urlId: res.body.urlId, secret: '123zwie'});
    })

    it('should receive an error if the secret is smaller than 3 characters', async function () {
        // mongoose.connection.readyState = 1;
        SecretModel.create = jest.fn()

        const res = await request.post('/api/secret/123456qwerty')
            .send({secret: '123zwie'});

        expect(res.status).toBe(404);
        expect(res.body).toEqual({title:'SecretTooShortError', message:'Secret is too short'});

        expect(SecretModel.findOne).toHaveBeenCalledTimes(0);
    })
});
