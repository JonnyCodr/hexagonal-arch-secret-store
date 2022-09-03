import {Secret} from "../../Models/Secret";
import {UrlId} from "../../Models/UrlId";

export interface SecretRepository {
    getSecretByUtlId(urlId: UrlId): Promise<Secret>;
    removeSecretByUtlId(urlId: UrlId): Promise<void>;

    storeUrlIdAndSecret(urlId: UrlId, secret: Secret): Promise<void>;

}
