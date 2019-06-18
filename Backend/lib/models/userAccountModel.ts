import * as mongoose from "mongoose";
import { Schema, Document, Model } from "mongoose";
import { IWorkoutPlan } from "./workoutPlanModel";

export interface IUserAccount extends Document {
    login: string;
    password: string;
    email: string;
    confirmed: boolean;
    createdAt: Date;
    workoutPlans: IWorkoutPlan[];
}

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
    confirmed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    workoutPlans: [{ type: Schema.Types.ObjectId, ref: "WorkoutPlan" }]
});

const UserAccount: Model<IUserAccount> = mongoose.model<IUserAccount>("UserAccount", UserAccountSchema);

export default UserAccount;
