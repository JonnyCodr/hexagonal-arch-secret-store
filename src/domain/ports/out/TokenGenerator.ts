/**
 * @interface TokenGenerator
 * @description Interface for the TokenGenerator
 * @version 1.0.0
 */
export interface TokenGenerator {

    /**
     * @return {string} generated token
     * @memberof TokenGenerator
     * @description Generates a token
     * @version 1.0.0
     */
    generateToken(): string;
}
