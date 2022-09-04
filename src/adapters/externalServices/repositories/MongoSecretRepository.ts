import {SecretRepository} from "../../../domain/ports/out/SecretRepository";
import {Secret} from "../../../domain/Models/Secret";
import {UrlId} from "../../../domain/Models/UrlId";
import mongoose from "mongoose";
import {SecretModel} from "./SecretModel";
import {SecretNotFoundInRepositoryError} from "../../../domain/Models/errors/SecretNotFoundInRepositoryError";


export class MongoSecretRepository implements SecretRepository {

    constructor() {
        this.setConnection();
    }

    async getSecretByUrlId(urlId: UrlId): Promise<Secret> {
        const doc = await SecretModel.findOne({ urlId: urlId.toString() });

        if (doc === null) {
            throw new SecretNotFoundInRepositoryError();
        }

        return new Secret(doc.secret)
    }

    async removeSecretByUrlId(urlId: UrlId): Promise<void> {
        await SecretModel.deleteOne({ urlId: urlId.toString() });
    }

    async storeUrlIdAndSecret(urlId: UrlId, secret: Secret): Promise<void> {
        await SecretModel.create({urlId: urlId.toString(), secret: secret.toString()});
    }


    private async setConnection() {
        if (mongoose.connection?.readyState === 0) {
            await mongoose.connect('mongodb://localhost:27017/onetimesecret')
            console.log('mongoose.connection.readyState:', mongoose.connection.readyState);
        }

    }

}
