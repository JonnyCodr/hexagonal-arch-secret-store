import { Application } from "./adapters/rest/Application";
import {Route} from "./adapters/rest/routes/Routes";
import {SecretsByIdController} from "./adapters/rest/controller/SecretsByIdController";
import {SecretRoute} from "./adapters/rest/routes/SecretRoute";
import {SecretsController} from "./adapters/rest/controller/SecretsController";
import {OneTimeSecretStorer} from "./domain/useCases/OneTimeSecretStorer";
import {UniqueTokenGenerator} from "./adapters/externalServices/UniqueIdTokenGenerator";
import {MongoSecretRepository} from "./adapters/externalServices/repositories/MongoSecretRepository";
import {OneTimeSecretRetriever} from "./domain/useCases/OneTimeSecretRetriever";
import {SecretsByIdRoute} from "./adapters/rest/routes/SecretsByIdRoute";


const secretRepository = new MongoSecretRepository();

const SecretRetriever = new OneTimeSecretRetriever(secretRepository);
const secretsByIdController = new SecretsByIdController(SecretRetriever);
const SecretByIdRoute = new SecretsByIdRoute(secretsByIdController);

const tokenGenerator = new UniqueTokenGenerator();
const secretStorer = new OneTimeSecretStorer(secretRepository, tokenGenerator)
const secretsController = new SecretsController(secretStorer);
const secretRoute = new SecretRoute(secretsController);

const routeList: Route[] = [];
routeList.push(secretRoute);
routeList.push(SecretByIdRoute);

const application: Application = new Application(routeList);

application.startServer(3000);
