export class UrlIdTooShortError extends Error {
    constructor() {
        super('Url Id is too short');
        this.name = 'UrlIdTooShortError';
    }
}
