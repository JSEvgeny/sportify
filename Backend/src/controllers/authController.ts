import { Request, Response, Router } from "express";
import { check, validationResult, ValidationError, Result, ValidationChain } from "express-validator";
import UserAccount, { IUserAccount } from "../models/userAccountModel";
import AuthHelper, { IToken } from "../helpers/authHelper";

class AuthController {
    public path: string = "/auth";
    public router: Router = Router();

    private _signUpValidationMiddleware: ValidationChain[] = [
        check("login", "Login must have more than 5 characters")
            .not()
            .isEmpty(),
        check("email", "Email is required")
            .not()
            .isEmpty(),
        check("email", "Email is not correct").isEmail(),
        check("password", "Password must be at least 5 characters")
            .not()
            .isEmpty()
    ];

    private _singInValidationMiddleware: ValidationChain[] = [
        check("login", "Login can not be empty")
            .not()
            .isEmpty(),
        check("password", "Password can not be empty")
            .not()
            .isEmpty()
    ];

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.post(`${this.path}/signin`, this._singInValidationMiddleware, this.signIn);
        this.router.post(`${this.path}/signup`, this._signUpValidationMiddleware, this.signUp);
    }

    public signIn = async (req: Request, res: Response): Promise<void> => {
        const userAccount = await UserAccount.findOne({ login: req.body.login });
        const validationErrors: Result<ValidationError> = validationResult(req);

        if (validationErrors.isEmpty()) {
            if (userAccount.comparePassword(userAccount.password)) {
                const token: IToken = AuthHelper.generateToken(userAccount);
                //res.setHeader("Set-Cookie", [AuthHelper.createCookie(token)]);
                res.status(200).json(token);
            } else {
                res.status(422).json("Wrong login and password combination");
            }
        }
    };

    public signUp = async (req: Request, res: Response): Promise<void> => {
        const newUserAccount: IUserAccount = new UserAccount(req.body);
        const validationErrors: Result<ValidationError> = validationResult(req);

        if (validationErrors.isEmpty()) {
            newUserAccount.save((err, userAccount: IUserAccount) => {
                if (err) {
                    res.json(err);
                }
                res.json(userAccount);
            });
        } else {
            res.status(422).json(validationErrors.array());
        }
    };
}

export default new AuthController();
