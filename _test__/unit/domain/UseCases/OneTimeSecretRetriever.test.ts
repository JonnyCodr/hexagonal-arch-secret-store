import {SecretRepository} from "../../../../src/domain/ports/out/SecretRepository";
import {Secret} from "../../../../src/domain/Models/Secret";
import {OneTimeSecretRetriever} from "../../../../src/domain/useCases/OneTimeSecretRetriever";
import {UrlId} from "../../../../src/domain/Models/UrlId";


describe('OneTimeSecretRetriever', function () {
    it('should retrieve the secret one time', async function () {

        const secretRepo: SecretRepository = {
            getSecretByUrlId: jest.fn().mockResolvedValue(new Secret('123zwie')),
            removeSecretByUrlId: jest.fn(),
            storeUrlIdAndSecret: jest.fn()
        }

        const oneTimeSecretRetriever = new OneTimeSecretRetriever(secretRepo);
        const urlId = new UrlId('123456sdfvojenrvq');

        await expect(oneTimeSecretRetriever.retrieveSecret(urlId)).resolves.toEqual(new Secret('123zwie'));
        expect(secretRepo.getSecretByUrlId).toHaveBeenCalledTimes(1);
        expect(secretRepo.getSecretByUrlId).toHaveBeenCalledWith(urlId);
        expect(secretRepo.removeSecretByUrlId).toHaveBeenCalledTimes(1);
        expect(secretRepo.removeSecretByUrlId).toHaveBeenCalledWith(urlId);

  });
});
