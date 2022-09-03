import {Secret} from "../../Models/Secret";
import {UrlId} from "../../Models/UrlId";


export interface SecretRetriever {
    retrieveSecret(urlId: UrlId): Promise<Secret>;
}
