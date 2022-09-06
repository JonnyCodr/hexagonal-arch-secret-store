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

    /**
     * @description This function is used to get the url id
     * @returns {string} url id
     * @version 1.0.0
     */
    toString(): string {
        return this.urlId;
    }
}
