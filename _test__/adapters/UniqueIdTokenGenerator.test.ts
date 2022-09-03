// import { UniqueTokenGenerator } from '../../src/adapters/UniqueIdTokenGenerator';
// import uniqid from 'uniqid';
//
// describe('Uniq Token Generator Test', function () {
//
//     jest.mock('uniqId')
//     const mockUniqueId = uniqid as jest.MockedFunction<typeof uniqid>;
//
//     jest.mock('uniqId', () => {
//
//     })
//
//     it('should generate a uniq token that is longer than 10 chars', async function () {
//
//         mockUniqueId.mockReturnValue('123456qwerty');
//
//         const uniqTokenGenerator = new UniqueTokenGenerator();
//         const token = uniqTokenGenerator.generateToken();
//
//         expect(token).not.toBeNull();
//         expect(token.length).toBeGreaterThanOrEqual(10);
//         expect(token).toBe('123456qwerty')
//     });
// });
