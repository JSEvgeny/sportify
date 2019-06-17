import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUserAccount extends Document {
    login: string;
    password: string;
    email: string;
    confirmed: boolean;
    created_date: Date;
}

const Schema = mongoose.Schema;

const UserAccountSchema: Schema<IUserAccount> = new Schema({
    login: {
        type: String,
        required: "Login is required"
    },
    password: {
        type: String,
        required: "Password is required"
    },
    email: {
        type: String,
        required: "Email is required"
    },
    brand: {
        type: String,
        required: "You must specify a brand for new product"
    }
});

const UserAccount: Model<IUserAccount> = mongoose.model<IUserAccount>("UserAccount", UserAccountSchema);

export default UserAccount;
