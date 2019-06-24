import { Request, Response, NextFunction } from "express";
import Auth from "../config/passport";
import { IUserAccount } from "../models/userAccountModel";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (req.path.includes("signin")) return next();

    return Auth.authenticate((err: any, userAccount: IUserAccount, info: any) => {
        if (err) {
            return next(err);
        }
        if (!userAccount) {
            if (info.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Your token has expired. Please generate a new one" });
            } else {
                return res.status(401).json({ message: info.message });
            }
        }
        return next();
    })(req, res, next);
};

export default authMiddleware;
