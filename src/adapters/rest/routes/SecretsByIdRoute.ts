import {Route} from "./Routes";
import {Application} from "express";
import {SecretsController} from "../controller/SecretsController";
import {SecretsByIdController} from "../controller/SecretsByIdController";

export class SecretsByIdRoute implements Route {

    constructor(private secretByIdController: SecretsByIdController) {}

    mountRoute(application: Application): void {
        application.route('/api/v1/secrets/:urlId')
            .get()
    }

}
