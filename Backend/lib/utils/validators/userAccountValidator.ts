import UserAccountService from "services/userAccountService";

export default class UserAccountValidator {
    private accountService: UserAccountService = new UserAccountService();

    public async isLoginUnique(login: string): Promise<boolean> {
        return !!this.accountService.findUserAccountByLoginAsync(login);
    }

    public async isEmailUnique(login: string): Promise<boolean> {
        return !!this.accountService.findUserAccountByEmailAsync(login);
    }
}
