import {Secret} from "../../Models/Secret";
import {UrlId} from "../../Models/UrlId";

/**
 * @interface SecretRepository
 * @description This interface defines the methods that a SecretRepository must implement.
 * @version 1.0.0
 */
export interface SecretRepository {

    /**
     * @param {UrlId} urlId
     * @return {Promise<Secret>}
     * @memberof SecretRepository
     * @description Retrieves a secret by its urlId
     * @version 1.0.0
     */
    getSecretByUrlId(urlId: UrlId): Promise<Secret>;

    /**
     * @param {UrlId} urlId
     * @return {Promise<void>}
     * @memberof SecretRepository
     * @description Removes a secret by its urlId
     * @version 1.0.0
     */
    removeSecretByUrlId(urlId: UrlId): Promise<void>;

    /**
     * @param {UrlId} urlId
     * @param {Secret} secret
     * @return {Promise<void>}
     * @memberof SecretRepository
     * @description Stores a secret by its urlId
     * @version 1.0.0
     */
    storeUrlIdAndSecret(urlId: UrlId, secret: Secret): Promise<void>;

}
