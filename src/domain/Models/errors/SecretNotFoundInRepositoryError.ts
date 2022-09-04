
export class SecretNotFoundInRepositoryError extends Error {
  constructor() {
    super('Secret not found in repository');
    this.name = 'SecretNotFoundInRepositoryError';
  }
}
