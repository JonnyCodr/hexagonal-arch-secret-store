import {UrlId} from "../Models/UrlId";
import {Secret} from "../Models/Secret";
import {SecretStorer} from "../ports/in/SecretStorer";
import {SecretRepository} from "../ports/out/SecretRepository";
import {TokenGenerator} from "../ports/out/TokenGenerator";



export class OneTimeSecretStorer implements SecretStorer {

    constructor(private secretRepo: SecretRepository, private tokenGenerator: TokenGenerator) {

    }

    async storeSecret(secret: Secret): Promise<UrlId> {
        const token = this.tokenGenerator.generateToken();
        const urlId = new UrlId(token);
        await this.secretRepo.storeUrlIdAndSecret(urlId, secret);
        return urlId;
    }


}

