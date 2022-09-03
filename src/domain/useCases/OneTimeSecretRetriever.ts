import {UrlId} from "../Models/UrlId";
import {Secret} from "../Models/Secret";
import {SecretRepository} from "../ports/out/SecretRepository";
import {SecretRetriever} from "../ports/in/SecretRetriever";



export class OneTimeSecretRetriever implements SecretRetriever {

    constructor(private secretRepo: SecretRepository) {
    }

    /**
     * Retrieves a secret by urlId
     * @param urlId
     */
    async retrieveSecret(urlId: UrlId): Promise<Secret> {
        const secret = await this.secretRepo.getSecretByUtlId(urlId)
        await this.secretRepo.removeSecretByUtlId(urlId)
        return secret
    }
}

