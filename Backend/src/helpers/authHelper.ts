import * as jwt from "jsonwebtoken";
import { IUser } from "models/userModel";

export interface IToken {
    token: string;
    expiresIn: number;
}

interface ITokenData {
    _id: string;
}

class AuthHelper {
    private static _expiresIn: number = 60 * 60; // One hour
    private static _secret: string = process.env.JWT_SECRET;

    public static generateToken = (user: IUser): IToken => {
        const dataStoredInToken: ITokenData = {
            _id: user._id
        };

        const token: IToken = {
            token: jwt.sign(dataStoredInToken, AuthHelper._secret, { expiresIn: AuthHelper._expiresIn }),
            expiresIn: AuthHelper._expiresIn
        };

        return token;
    };
}

export default AuthHelper;
