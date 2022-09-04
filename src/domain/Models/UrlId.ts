import {UrlIdTooShortError} from "./errors/UrlIdTooShortError";

/**
 * @class {UrlId} UrlId
 */
export class UrlId {
    constructor(private urlId: string) {
        if (urlId.length < 10) {
            throw new UrlIdTooShortError();
        }
    }
}
