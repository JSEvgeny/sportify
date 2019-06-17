import UserAccount, { IUserAccount } from "models/userAccountModel";

export default class UserAccountService {
    public async createUserAccountAsync(userAccount: IUserAccount): Promise<void> {
        const newUserAccount: IUserAccount = new UserAccount(userAccount);

        await newUserAccount.save((err, userAccount) => {
            if (err) {
                throw err;
            }
        });
    }

    public async findUserAccountByLoginAsync(login: string): Promise<IUserAccount | null> {
        const userAccount: IUserAccount = await UserAccount.findOne({ login }, (err, userAccount: IUserAccount) => {
            if (err) {
                throw err;
            }
            return userAccount;
        });

        return userAccount;
    }

    public async findUserAccountByEmailAsync(email: string): Promise<IUserAccount | null> {
        const userAccount: IUserAccount = await UserAccount.findOne({ email }, (err, userAccount: IUserAccount) => {
            if (err) {
                throw err;
            }
            return userAccount;
        });

        return userAccount;
    }
}
