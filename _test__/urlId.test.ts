import {UrlId} from "../src/Models/UrlId";
import {UrlIdTooShortError} from "../src/UrlIdTooShortError";

describe('URL ID test', function () {
    it('should create and instance of UrlId', function () {
        expect(new UrlId('lskdjfnvrovnaeori38welrkfn')).toBeInstanceOf(UrlId);
    });

    it('should throw an error if the url id is too short', function () {
        expect(() => new UrlId('12')).toThrow(UrlIdTooShortError);
    });
});
