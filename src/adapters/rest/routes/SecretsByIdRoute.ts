import {Route} from "./Routes";
import {Application} from "express";
import {SecretsController} from "../controller/SecretsController";
import {SecretsByIdController} from "../controller/SecretsByIdController";

export class SecretsByIdRoute implements Route {

    constructor(private secretByIdController: SecretsByIdController) {}

    /**
     *
     * @param {Application} application
     * @return {void}
     * @memberof SecretsByIdRoute
     * @description Mounts the route to the application
     * @version 1.0.0
     */
    mountRoute(application: Application): void {
        application.route('/api/v1/secrets/:urlId')
            .get()
    }

}
