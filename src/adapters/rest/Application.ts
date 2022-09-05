import express from 'express';
import {Route} from "./routes/Routes";
import {errorHandler} from "./middlwware/ErrorHandler";

export class Application {
    app: express.Application = express();

    constructor(private routeList: Route[]) {
        this.appConfig()
        this.mountRoutes()
    }

    private mountRoutes() {
        this.routeList.forEach(route => route.mountRoute(this.app));
        this.app.use(errorHandler);
    }

    private appConfig() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
    }

    startServer(port: number) {
        this.app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    }
}
