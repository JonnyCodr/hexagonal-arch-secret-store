import {Secret} from "../../Models/Secret";
import {UrlId} from "../../Models/UrlId";

/**
 * @interface SecretRepository
 * @description This interface defines the methods that a SecretRepository must implement.
 * @version 1.0.0
 */
export interface SecretRetriever {

    /**
     * @param {UrlId} urlId
     * @return {Promise<Secret>}
     * @memberof SecretRepository
     * @description Retrieves a secret by its urlId
     * @version 1.0.0
     */
    retrieveSecret(urlId: UrlId): Promise<Secret>;
}
