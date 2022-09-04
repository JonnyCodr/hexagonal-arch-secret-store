import mongoose from "mongoose";
import {MongoSecretRepository} from "../../../../src/adapters/externalServices/repositories/MongoSecretRepository";
import {Secret} from "../../../../src/domain/Models/Secret";
import {UrlId} from "../../../../src/domain/Models/UrlId";
import {SecretModel} from "../../../../src/adapters/externalServices/repositories/SecretModel";
import {SecretNotFoundInRepositoryError} from "../../../../src/domain/Models/errors/SecretNotFoundInRepositoryError";

describe('MongoSecretRepository test', function () {
    it('should connect to the database', async function () {

        mongoose.connect = jest.fn();

        new MongoSecretRepository();

        expect(mongoose.connect).toBeCalledTimes(1);
        expect(mongoose.connect).toBeCalledWith('mongodb://localhost:27017/onetimesecret');
    });

    // it('should not connect to the database if the connection is already open', async function () {
    //     mongoose.connect = jest.fn();
    //     mongoose.connection.readyState = 1;
    //
    //     new MongoSecretRepository();
    //     expect(mongoose.connect).toBeCalledTimes(0);
    // });

    it('should retrieve a secret form mongo', async function () {

        SecretModel.findOne = jest.fn().mockResolvedValue(new SecretModel({secret: '123zwie'}));
        const mongoSecretRepository = new MongoSecretRepository();

        const urlId = new UrlId('123456sdfvojenrvq');

        const doc = await mongoSecretRepository.getSecretByUrlId(urlId);

        expect(doc).toEqual(new Secret('123zwie'));
        expect(SecretModel.findOne).toBeCalledTimes(1);
        expect(SecretModel.findOne).toBeCalledWith({urlId: urlId.toString()});
    });

    it('should throw an error when requesting a secret that does not exist', async function () {

        SecretModel.findOne = jest.fn().mockResolvedValue(null);
        const mongoSecretRepository = new MongoSecretRepository();

        const urlId = new UrlId('123456sdfvojenrvq');

        const doc = mongoSecretRepository.getSecretByUrlId(urlId);

        await expect(doc).rejects.toThrow(SecretNotFoundInRepositoryError);
        expect(SecretModel.findOne).toBeCalledTimes(1);
        expect(SecretModel.findOne).toBeCalledWith({urlId: urlId.toString()});
    });

    it('should remove a secret from the database', async function () {

        SecretModel.deleteOne = jest.fn()
        const mongoSecretRepository = new MongoSecretRepository();

        const urlId = new UrlId('123456sdfvojenrvq');
        await mongoSecretRepository.removeSecretByUrlId(urlId);

        expect(SecretModel.deleteOne).toBeCalledTimes(1);
        expect(SecretModel.deleteOne).toBeCalledWith({urlId: urlId.toString()});
    });

    it('should create a urlId and secret in the database', async function () {

        SecretModel.create = jest.fn()
        const mongoSecretRepository = new MongoSecretRepository();

        const urlId = new UrlId('123456sdfvojenrvq');
        const secret = new Secret('123zwie');

        await mongoSecretRepository.storeUrlIdAndSecret(urlId, secret);

        expect(SecretModel.create).toBeCalledTimes(1);
        expect(SecretModel.create).toBeCalledWith({ urlId: urlId.toString(), secret: secret.toString() });
    });
});
