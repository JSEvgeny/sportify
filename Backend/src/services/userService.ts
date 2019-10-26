import User, { IUser } from "../models/userModel";

class UserService {
    public async createUser(user: IUser): Promise<IUser> {
        return await user.save();
    }

    public async findByLogin(login: string): Promise<IUser | null> {
        return await User.findOne({ login });
    }

    public async findByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email });
    }

    public async comparePassword(candidatePassword: string, user: IUser): Promise<boolean> {
        return await user.comparePassword(candidatePassword);
    }
}

export default UserService;
