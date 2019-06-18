import { Request, Response } from "express";
import * as bcrypt from "bcrypt";

import UserAccount from "../models/userAccountModel";
import UserAccountValidator from "utils/validators/userAccountValidator";
import UserAccountService from "services/userAccountService";

export class AuthenticationController {
    private readonly saltRounds: number = 10;

    private userAccountValidator = new UserAccountValidator();
    private userAccountService = new UserAccountService();

    public async registerUserAccountAsync(req: Request, res: Response): Promise<void> {
        let newUserAcoount = new UserAccount(req.body);

        const uniqueLogin = await this.userAccountValidator.isLoginUnique(newUserAcoount.login);
        const uniqueEmail = await this.userAccountValidator.isEmailUnique(newUserAcoount.email);

        if (uniqueLogin && uniqueEmail) {
            bcrypt.hash(newUserAcoount.password, this.saltRounds, async (err, hash) => {
                if (err) {
                    throw err;
                }

                newUserAcoount.password = hash;

                await this.userAccountService.createUserAccountAsync(newUserAcoount);
                res.status(200);
            });
        }
    }
}
