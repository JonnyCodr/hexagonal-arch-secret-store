import {Secret} from "../../../src/domain/Models/Secret";
import {SecretTooShortError} from "../../../src/domain/Models/errors/SecretTooShortError";


describe('secret test', function () {
    it('should create and instance of Secret', function () {
        expect(new Secret('123zwe')).toBeInstanceOf(Secret);
    });

    it('should throw an erropr if the secret is too short', function () {
        expect(() => new Secret('12')).toThrow(SecretTooShortError);
    });

    it('should return the secret as a string', function () {
        expect(new Secret('123zwe').toString()).toEqual('123zwe');
    });
});
