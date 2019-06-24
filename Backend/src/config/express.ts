import * as bodyParser from "body-parser";
import * as express from "express";

import Mongo from "./mongo";
import Auth from "./passport";

import AuthController from "../controllers/authController";
import IndexController from "../controllers/indexController";

import authMiddleware from "../middlewares/authMiddleware";

class App {
    public app: express.Application = express();

    private _mongoDb = new Mongo();
    private _port = Number(process.env.PORT) || 3000;
    private _path: string = process.env.API_BASE || "/";

    constructor(controllers = [AuthController, IndexController]) {
        this.initializeGlobalMiddlewares();
        this.initializeControllers(controllers);
        this.connectToMongo();
    }

    public listen(): void {
        this.app.listen(this._port, () => {
            console.log(`Express app listening on the port ${this._port}`);
        });
    }

    private initializeGlobalMiddlewares(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        // support passport strategies
        this.app.use(Auth.initializePassport());
    }

    private initializeErrorHandling(): void {
        //TODO: implement error handling
    }

    private initializeControllers(controllers): void {
        controllers.forEach(controller => {
            this.app.use(this._path, authMiddleware, controller.router);
        });
    }

    private connectToMongo(): void {
        // create connection to MongoDB instance
        this._mongoDb.connect();
    }
}

export default new App();
