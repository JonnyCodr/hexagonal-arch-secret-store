
import {Secret} from "../../../src/domain/Models/Secret";
import {OneTimeSecretRetriever} from "../../../src/domain/useCases/OneTimeSecretRetriever";
import {UrlId} from "../../../src/domain/Models/UrlId";
import {SecretRepository} from "../../../src/domain/ports/out/SecretRepository";


describe('OneTimeSecretRetriever', function () {
    it('should retrieve the secret one time', async function () {

        const secretRepo: SecretRepository = {
            getSecretByUtlId: jest.fn().mockResolvedValue(new Secret('123zwie')),
            removeSecretByUtlId: jest.fn(),
            storeUrlIdAndSecret: jest.fn()
        }

        const oneTimeSecretRetriever = new OneTimeSecretRetriever(secretRepo);
        const urlId = new UrlId('123456sdfvojenrvq');

        await expect(oneTimeSecretRetriever.retrieveSecret(urlId)).resolves.toEqual(new Secret('123zwie'));
        expect(secretRepo.getSecretByUtlId).toHaveBeenCalledTimes(1);
        expect(secretRepo.getSecretByUtlId).toHaveBeenCalledWith(urlId);
        expect(secretRepo.removeSecretByUtlId).toHaveBeenCalledTimes(1);
        expect(secretRepo.removeSecretByUtlId).toHaveBeenCalledWith(urlId);

  });
});
