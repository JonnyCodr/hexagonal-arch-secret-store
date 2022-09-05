import {Route} from "./Routes";
import {Application} from "express";
import {SecretsController} from "../controller/SecretsController";

export class SecretRoute implements Route{

    constructor(private secretsConstructor: SecretsController) {}

    mountRoute(application: Application): void {
        application.route('/api/v1/secrets')
            .post(this.secretsConstructor.createSecret)
    }

}
