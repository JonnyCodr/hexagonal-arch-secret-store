
export class SecretNotFoundInRepositoryError extends Error {
  constructor() {
    super('Secret not found in Repository');
    this.name = 'SecretNotFoundInRepositoryError';
  }
}
