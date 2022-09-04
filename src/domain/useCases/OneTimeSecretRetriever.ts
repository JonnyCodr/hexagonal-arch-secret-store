import {UrlId} from "../Models/UrlId";
import {Secret} from "../Models/Secret";
import {SecretRepository} from "../ports/out/SecretRepository";
import {SecretRetriever} from "../ports/in/SecretRetriever";


/**
 * This class is responsible for retrieving a secret from the repository.
 */
export class OneTimeSecretRetriever implements SecretRetriever {

    constructor(private secretRepo: SecretRepository) {
    }

    /**
     * Retrieves a secret by urlId
     * @param urlId
     * @returns {Promise<Secret>} {@link Secret secret} or null if not found
     * @description This method will remove the secret from the repository after retrieval.
     * @throws {Error} if the secret is not found
     * @since 1.0.0
     * @version 1.0.0
     * @see {@link
     */
    async retrieveSecret(urlId: UrlId): Promise<Secret> {
        const secret = await this.secretRepo.getSecretByUrlId(urlId)
        await this.secretRepo.removeSecretByUrlId(urlId)
        return secret
    }
}

