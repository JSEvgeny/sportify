import { Request, Response, Router } from "express";
import { check, validationResult, ValidationError, Result } from "express-validator";
import UserAccount, { IUserAccount } from "../models/userAccountModel";

class AuthController {
    public topRoute: string = "/auth";
    public router: Router = Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.post(`${this.topRoute}/signin`, this.signIn);
        this.router.post(
            `${this.topRoute}/signup`,
            [
                check("login", "Login must have more than 5 characters")
                    .not()
                    .isEmpty(),
                check("email", "Email is required")
                    .not()
                    .isEmpty(),
                check("email", "Email is not correct")
                    .isEmail(),
                check("password", "Password must be at least 5 characters")
                    .not()
                    .isEmpty()
            ],
            this.signUp
        );
    }

    public signIn = (req: Request, res: Response) => {
        console.log("hello");
        res.send("signed in");
    };

    public signUp = (req: Request, res: Response) => {
        const newUserAccount: IUserAccount = new UserAccount(req.body);
        const validationErrors: Result<ValidationError> = validationResult(req);

        if (validationErrors.isEmpty()) {
            newUserAccount.save((err, userAccount: IUserAccount) => {
                if (err) {
                    return res.json(err);
                }

                return res.json(userAccount);
            });
        } else {
            return res.status(422).json(validationErrors.array());
        }
    };
}

export default new AuthController();
