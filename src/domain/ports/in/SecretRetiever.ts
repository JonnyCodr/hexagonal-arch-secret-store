import {Secret} from "../../Models/Secret";
import {UrlId} from "../../Models/UrlId";


export interface SecretRetiever {
    retrieveSecret(urlId: UrlId): Promise<Secret>;
}
