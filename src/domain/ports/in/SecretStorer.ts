import {Secret} from "../../Models/Secret";
import {UrlId} from "../../Models/UrlId";

/**
 * @interface SecretStorer
 * @description This interface defines the methods that a SecretStorer must implement.
 * @version 1.0.0
 */
export interface SecretStorer {

    /**
     * @param {UrlId} urlId
     * @param {Secret} secret
     * @return {Promise<UrlId>} urlId of the stored secret
     * @memberof SecretStorer
     * @description Stores a secret by its urlId
     * @version 1.0.0
     */
    storeSecret(secret: Secret): Promise<UrlId>;
}
