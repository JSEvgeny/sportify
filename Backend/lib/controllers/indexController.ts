import { Request, Response, Router } from "express";

class IndexController {
    public topRoute: string = "/";
    public router: Router = Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(`${this.topRoute}`, this.serveReactApp);
    }

    public serveReactApp = (request: Request, response: Response): void => {
        response.send("React app served");
    };
}

export default new IndexController();
