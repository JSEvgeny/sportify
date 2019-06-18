import { Request, Response } from "express";
import { AuthenticationController } from "controllers/authenticationController";

export class IndexRoute {
    public authController = new AuthenticationController();

    public route(app): void {
        app.route("/").get((req: Request, res: Response) => {
            res.status(200).json({
                message: "Hello I'm JSON!"
            });
        });

        app.route("/register").post(this.authController.registerUserAccountAsync);
    }
}
