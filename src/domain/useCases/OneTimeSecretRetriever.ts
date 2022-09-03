import {UrlId} from "../Models/UrlId";
import {Secret} from "../Models/Secret";
import {SecretRepository} from "../ports/out/SecretRepository";
import {SecretRetiever} from "../ports/in/SecretRetiever";



export class OneTimeSecretRetriever implements SecretRetiever {

    constructor(private secretRepo: SecretRepository) {
    }

    async retrieveSecret(urlId: UrlId): Promise<Secret> {
        const secret = await this.secretRepo.getSecretByUtlId(urlId)
        await this.secretRepo.removeSecretByUtlId(urlId)
        return secret
    }
}

