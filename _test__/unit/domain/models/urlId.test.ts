import {UrlIdTooShortError} from "../../../../src/domain/Models/errors/UrlIdTooShortError";
import {UrlId} from "../../../../src/domain/Models/UrlId";

describe('URL ID test', function () {
    it('should create and instance of UrlId', function () {
        expect(new UrlId('lskdjfnvrovnaeori38welrkfn')).toBeInstanceOf(UrlId);
    });

    it('should throw an error if the url id is too short', function () {
        expect(() => new UrlId('12')).toThrow(UrlIdTooShortError);
    });

    it('should return a string representation on the toString method', function () {

        expect(new UrlId('lskdjfnvrovnaeori38welrkfn').toString()).toBe('lskdjfnvrovnaeori38welrkfn');
    });
});
