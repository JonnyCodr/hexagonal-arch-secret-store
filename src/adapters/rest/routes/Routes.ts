import {Application} from "express";

export interface Route {

    /**
     * @param {Application} application
     * @return {void}
     * @memberof Route
     * @description Mounts the route to the application
     * @version 1.0.0
     */
    mountRoute(application: Application): void;
}
