import * as bodyParser from "body-parser";
import * as express from "express";

import Mongo from "./mongo";

import AuthController from "../controllers/authController";
import IndexController from "../controllers/indexController";

class App {
    public app: express.Application;

    private _mongoDb = new Mongo();
    private _port = process.env.PORT || 3000;

    constructor(controllers = [AuthController, IndexController]) {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.connectToMongo();
    }

    public listen() {
        this.app.listen(this._port, () => {
            console.log(`Express app listening on the port ${this._port}`);
        });
    }

    private initializeMiddlewares() {
        // support application/json type post data
        this.app.use(bodyParser.json());
    }

    private initializeErrorHandling() {
        //TODO: implement error handling
    }

    private initializeControllers(controllers) {
        controllers.forEach(controller => {
            this.app.use("/", controller.router);
        });
    }

    private connectToMongo() {
        // create connection to MongoDB instance
        this._mongoDb.connect();
    }
}

export default new App();
