import { Request, Response, NextFunction } from "express";
import Auth from "../config/passport";
import { IUser } from "../models/userModel";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    return Auth.authenticate((err: any, user: IUser, info: any) => {
        if (err) {
            return next(err);
        }
        if (!user) {
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
