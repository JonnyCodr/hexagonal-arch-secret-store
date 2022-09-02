import {Secret} from "../src/Models/Secret";
import {SecretTooShortError} from "../src/Models/errors/SecretTooShortError";

describe('secret test', function () {
    it('should create and instance of Secret', function () {
        expect(new Secret('123zwe')).toBeInstanceOf(Secret);
    });

    it('should throw an erropr if the secret is too short', function () {
        expect(() => new Secret('12')).toThrow(SecretTooShortError);
    });
});
