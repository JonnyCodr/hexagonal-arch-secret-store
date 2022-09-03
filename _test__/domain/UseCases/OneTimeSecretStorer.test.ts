import {Secret} from "../../../src/domain/Models/Secret";
import {OneTimeSecretStorer} from "../../../src/domain/useCases/OneTimeSecretStorer";
import {UrlId} from "../../../src/domain/Models/UrlId";
import {SecretRepository} from "../../../src/domain/ports/out/SecretRepository";

describe('OneTimeSecretStorer', function () {
    it('should store a secret and return urlId', async function () {

        const secretRepo: SecretRepository = {
            getSecretByUtlId: jest.fn(),
            removeSecretByUtlId: jest.fn(),
            storeUrlIdAndSecret: jest.fn()
        }

        const tokenGenerator = {
            generateToken: jest.fn().mockReturnValue('123456sdfvojenrvq')
        }

        const oneTimeSecretStorer = new OneTimeSecretStorer(secretRepo, tokenGenerator);

        const secret = new Secret('123zwie');

        expect(await oneTimeSecretStorer.storeSecret(secret)).toEqual(new UrlId('123456sdfvojenrvq'));
        expect(secretRepo.storeUrlIdAndSecret).toHaveBeenCalledTimes(1);
        expect(secretRepo.storeUrlIdAndSecret).toHaveBeenCalledWith(new UrlId('123456sdfvojenrvq'), secret);
        expect(tokenGenerator.generateToken).toHaveBeenCalledTimes(1);
  });
});
