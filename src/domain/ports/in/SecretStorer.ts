import {Secret} from "../../Models/Secret";
import {UrlId} from "../../Models/UrlId";

export interface SecretStorer {
    storeSecret(secret: Secret): Promise<UrlId>;
}
