import * as passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import UserAccount, { IUserAccount } from "../models/userAccountModel";
import { Handler } from "express";

require("dotenv").config();

class Auth {
    public passport: passport.PassportStatic = passport;

    private readonly _secret: string = process.env.JWT_SECRET;

    constructor() {
        this.initializePassport();
    }

    public initializePassport(): Handler {
        this.passport.use("jwt", this.getJwtStrategy());
        return this.passport.initialize();
    }

    public authenticate = callback => passport.authenticate("jwt", { session: false, failWithError: true }, callback);

    private getJwtStrategy = (): Strategy => {
        const params = {
            secretOrKey: this._secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
            passReqToCallback: true
        };

        return new Strategy(params, (req, payload: any, done) => {
            UserAccount.findOne({ login: payload.login }, (err, userAccount: IUserAccount) => {
                if (err) {
                    return done(err);
                }

                if (userAccount === null) {
                    return done(null, false, { message: "The user in the token was not found" });
                }

                return done(null, { _id: userAccount._id, login: userAccount.login });
            });
        });
    };
}

export default new Auth();
