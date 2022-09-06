import {Route} from "./Routes";
import {Application} from "express";
import {SecretsController} from "../controller/SecretsController";

export class SecretRoute implements Route{

    constructor(private secretsConstructor: SecretsController) {}

    /**
     *
     * @param application
     * @return {void}
     * @memberof SecretRoute
     * @description Mounts the route to the application
     * @version 1.0.0
     */
    mountRoute(application: Application): void {
        application.route('/api/v1/secrets')
            .post(this.secretsConstructor.createSecret)
    }

}
