import uniqid from "uniqid";
import {TokenGenerator} from "../../domain/ports/out/TokenGenerator";

export class UniqueTokenGenerator implements TokenGenerator {

    generateToken(): string {
        return uniqid();
    }
}
