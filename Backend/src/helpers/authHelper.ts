import * as jwt from "jsonwebtoken";
import { IUserAccount } from "models/userAccountModel";

export interface IToken {
    token: string;
    expiresIn: number;
}

interface IDataInToken {
    _id: string;
}

class AuthHelper {
    private static _expiresIn: number = 60 * 60; // One hour
    private static _secret: string = process.env.JWT_SECRET;

    public static generateToken = (userAccount: IUserAccount): IToken => {
        const dataStoredInToken: IDataInToken = {
            _id: userAccount._id
        };
        return {
            token: jwt.sign(dataStoredInToken, AuthHelper._secret, { expiresIn: AuthHelper._expiresIn }),
            expiresIn: AuthHelper._expiresIn
        };
    };
}

export default AuthHelper;
